import Nullstack from 'nullstack'
import copy from 'copy-to-clipboard'
import { hmsToSeconds, secondsToHms } from '../helpers/timeHelper'
import Button from '../components/Button'
import Textarea from '../components/Textarea'
import Confirm from '../components/Confirm'
import CopyIcon from '../components/CopyIcon'
import PlayIcon from '../components/PlayIcon'
import PauseIcon from '../components/PauseIcon'
import StopIcon from '../components/StopIcon'
import CircleCheckIcon from '../components/CircleCheckIcon'
import Footer from '../layout/Footer'
import listenToShortcuts from '../helpers/shortcuts'

import './Home.scss'

const LS_KEY = 'snap-notes'

class Home extends Nullstack {
  elapsedSeconds = 0
  _timerId = null
  notes = ''
  isRunning = false
  snackBar = false

  async hydrate() {
    const savedSnapshot = localStorage.getItem(LS_KEY)
    const snapshot = JSON.parse(savedSnapshot) || {}
    if (snapshot?.elapsedSeconds > 0) {
      this.elapsedSeconds = snapshot.elapsedSeconds
      this.notes = snapshot.notes
      if (snapshot.isRunning) {
        this.startPause()
      }
    }
    listenToShortcuts()
  }

  startPause() {
    if (!this._timerId) {
      this._timerId = setInterval(() => {
        ++this.elapsedSeconds
        this.saveSnapshot()
      }, 1000)
      this.isRunning = true
      this.setNoteFocus()
      return
    }

    this.disabledNote()
    this.saveSnapshot()
  }

  stop() {
    this.elapsedSeconds = 0
    this.notes = ''
    this.disabledNote()
    this.saveSnapshot()
  }

  disabledNote() {
    this._timerId = clearInterval(this._timerId)
    this.isRunning = false
  }

  setNoteFocus() {
    const textarea = document.querySelector('textarea')
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = textarea.value.length
    }, 100)
  }

  confirmDialog() {
    const dialog = document.querySelector('#confirm-dialog')
    window.dialogPolyfill.registerDialog(dialog)
    dialog.showModal()
    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'yes') {
        this.stop()
      }
      this.setNoteFocus()
    })
  }

  isValidEntry({ lastNote }) {
    const rePattern = /^\d{2}\:\d{2}/
    if (lastNote && !rePattern.test(lastNote)) {
      return true
    }
    if (rePattern.test(lastNote)) {
      this.notes += '\n'
    }
    this.setNoteFocus()
    return false
  }

  saveSnapshot() {
    const elapsedSeconds = this.elapsedSeconds
    const notes = this.notes
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        elapsedSeconds,
        isRunning: this.isRunning,
        notes,
      })
    )
  }

  addNewNote({ event }) {
    if (event.key.toUpperCase() === 'ENTER') {
      event.preventDefault()
      const notes = this.notes.split('\n')
      const lastNote = notes.pop()
      if (this.isValidEntry({ lastNote })) {
        notes.push(`${secondsToHms(this.elapsedSeconds)} - ${lastNote}\n`)
        this.notes = notes.join('\n')
        this.saveSnapshot()
      }
    }
  }

  copyToClipboard() {
    copy(this.notes)
    this.snackBar = true
    setTimeout(() => {
      this.snackBar = false
    }, 3000)
  }

  onlyNumbers({ event }) {
    if (event.key.toUpperCase() === 'ENTER') {
      event.preventDefault()
      event.target.blur()
    }
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  updateTimeElapsed({ event }) {
    const timeElapsed = event.target.textContent
    this.elapsedSeconds = hmsToSeconds(timeElapsed)
  }

  renderStartButton() {
    return (
      <Button
        id="btn-start-pause"
        color="secondary"
        class="mr-3 w-28 justify-center"
        onclick={this.startPause}
      >
        {this._timerId ? (
          <PauseIcon class="mr-1.5" />
        ) : (
          <PlayIcon class="mr-1.5" />
        )}
        {this._timerId ? 'Pause' : 'Start'}
      </Button>
    )
  }

  renderStopButton() {
    return (
      <Button
        id="btn-stop"
        variant="outlined"
        color="danger"
        disabled={!this._timerId}
        onclick={this.confirmDialog}
      >
        <StopIcon class="mr-1.5" />
        Stop
      </Button>
    )
  }

  renderNotes() {
    return (
      <>
        <Textarea
          bind={this.notes}
          disabled={!this.isRunning}
          onkeydown={this.addNewNote}
        />
        <div class="flex justify-end">
          {this.notes && (
            <Button
              size="small"
              variant="outlined"
              color="default"
              onclick={this.copyToClipboard}
              id="btn-clipboard"
              class="my-2 z-10"
            >
              <CopyIcon class="h-4 w-4 mr-1" />
              Copy to clipboard
            </Button>
          )}
        </div>
      </>
    )
  }

  renderSnackbar() {
    return (
      this.snackBar && (
        <div
          class={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            bg-green-500 py-1.5 px-3 max-w-fit rounded-md drop-shadow-md text-sm
          `}
        >
          <CircleCheckIcon class="mr-2" />
          Successfully copied to clipboard!
        </div>
      )
    )
  }

  render() {
    return (
      <>
        <section>
          <div class="wrapper">
            <div class="md:flex md:justify-between items-center pt-4 pb-6">
              <img class="w-36 md:w-48 mx-auto md:mx-0" src="/notehack.svg" />
              <div
                class="text-center py-9 md:text-left time text-slate-700 text-3xl"
                contenteditable={!this.isRunning}
                onkeypress={this.onlyNumbers}
                onblur={this.updateTimeElapsed}
                default
              >
                {secondsToHms(this.elapsedSeconds)}
              </div>
              <div class="flex justify-center md:block">
                <StartButton />
                <StopButton />
              </div>
            </div>
            <div class="notes">
              <Notes />
            </div>
          </div>
          <Confirm />
          <Snackbar />
        </section>
        <Footer />
      </>
    )
  }
}

export default Home
