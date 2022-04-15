import Nullstack from "nullstack";
import copy from "copy-to-clipboard";
import { secondsToHms } from "./helpers/timeHelper";
import Button from "./components/Button";
import Textarea from "./components/Textarea";
import Confirm from "./components/Confirm";
import CopyIcon from "./components/CopyIcon";
import PlayIcon from "./components/PlayIcon";
import PauseIcon from "./components/PauseIcon";
import StopIcon from "./components/StopIcon";
import CircleCheckIcon from "./components/CircleCheckIcon";

import "./Home.scss";

class Home extends Nullstack {
  elapsedSeconds = 0;
  elapsedTime = "00:00:00";
  timerId;
  notes = "";
  isRunning = false;
  snackBar = false;
  LS_KEY = "snap-notes";

  async hydrate() {
    const savedSnapshot = localStorage.getItem(this.LS_KEY);
    const snapshot = JSON.parse(savedSnapshot) || {};
    if (snapshot?.elapsedSeconds > 0) {
      this.elapsedSeconds = snapshot.elapsedSeconds;
      this.notes = snapshot.notes;
      if (snapshot.isRunning) {
        this.startPause();
      }
    }
  }

  startPause() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        ++this.elapsedSeconds;
        this.saveSnapshot();
      }, 1000);
      this.isRunning = true;
      this.setNoteFocus();
      return;
    }

    this.disabledNote();
    this.saveSnapshot();
  }

  stop() {
    this.elapsedSeconds = 0;
    this.notes = "";
    this.disabledNote();
    this.saveSnapshot();
  }

  disabledNote() {
    this.timerId = clearInterval(this.timerId);
    this.isRunning = false;
  }

  setNoteFocus() {
    const textarea = document.querySelector("textarea");
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.value.length;
    }, 100);
  }

  confirmDialog() {
    const dialog = document.querySelector("#confirm-dialog");
    window.dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
    dialog.addEventListener("close", () => {
      if (dialog.returnValue === "yes") {
        this.stop();
      }
      this.setNoteFocus();
    });
  }

  isValidEntry({ lastNote }) {
    if (lastNote && !/^\d{2}\:\d{2}/.test(lastNote)) {
      return true;
    }
    if (/^\d{2}\:\d{2}/.test(lastNote)) {
      this.notes += "\n";
    }
    this.setNoteFocus();
    return false;
  }

  saveSnapshot() {
    const elapsedSeconds = this.elapsedSeconds;
    const notes = this.notes;
    localStorage.setItem(
      this.LS_KEY,
      JSON.stringify({
        elapsedSeconds,
        isRunning: this.isRunning,
        notes,
      })
    );
  }

  addNewNote({ event }) {
    if (event.key.toUpperCase() === "ENTER") {
      event.preventDefault();
      const notes = this.notes.split("\n");
      const lastNote = notes.pop();
      if (this.isValidEntry({ lastNote })) {
        notes.push(`${secondsToHms(this.elapsedSeconds)} - ${lastNote}\n`);
        this.notes = notes.join("\n");
        this.saveSnapshot();
      }
    }
  }

  copyToClipboard() {
    copy(this.notes);
    this.snackBar = true;
    setTimeout(() => {
      this.snackBar = false;
    }, 3000);
  }

  render() {
    return (
      <section>
        <div class="wrapper">
          <div class="md:flex md:justify-between items-center pt-4 pb-6">
            <img class="w-36 md:w-48 mx-auto md:mx-0" src="/notehack.svg" />
            <div class="text-center py-9 md:text-left time text-slate-700 text-3xl">
              {secondsToHms(this.elapsedSeconds)}
            </div>
            <div class="flex justify-center md:block">
              <Button
                color="secondary"
                class="mr-3 w-28 justify-center"
                onclick={this.startPause}
              >
                {this.timerId ? (
                  <PauseIcon class="mr-1.5" />
                ) : (
                  <PlayIcon class="mr-1.5" />
                )}
                {this.timerId ? "Pause" : "Start"}
              </Button>
              <Button
                variant="outlined"
                color="danger"
                disabled={!this.timerId}
                onclick={this.confirmDialog}
              >
                <StopIcon class="mr-1.5" />
                Stop
              </Button>
            </div>
          </div>
          <div class="notes">
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
                  class="my-2 -mt-10 mr-2 z-10"
                >
                  <CopyIcon class="h-4 w-4 mr-1" />
                  Copy to clipboard
                </Button>
              )}
            </div>
          </div>
        </div>
        <Confirm />
        {this.snackBar && (
          <div class="bg-green-500 py-1.5 px-3 max-w-fit rounded-md mx-auto drop-shadow-md text-sm">
            <CircleCheckIcon class="mr-2" />
            Successfully copied to clipboard!
          </div>
        )}
      </section>
    );
  }
}

export default Home;
