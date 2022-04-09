import Nullstack from "nullstack";
import copy from "copy-to-clipboard";
import "./Home.scss";
import { secondsToHms } from "./helpers/timeHelper";
import Button from "./components/Button";
import Textarea from "./components/Textarea";
import Confirm from "./components/Confirm";
import CopyIcon from "./components/CopyIcon";
import PlayIcon from "./components/PlayIcon";
import PauseIcon from "./components/PauseIcon";
import StopIcon from "./components/StopIcon";
import CircleCheckIcon from "./components/CircleCheckIcon";

class Home extends Nullstack {
  elapsedSeconds = 0;
  elapsedTime = "00:00:00";
  timerId;
  notes = "";
  isNoteEnabled = true;
  snackBar = false;

  startPause() {
    if (!this.timerId) {
      this.timerId = setInterval(() => ++this.elapsedSeconds, 1000);
      this.isNoteEnabled = false;
      return;
    }
    this.disabledNote();
  }

  stop() {
    this.elapsedSeconds = 0;
    this.notes = "";
    this.disabledNote();
  }

  disabledNote() {
    this.timerId = clearInterval(this.timerId);
    this.isNoteEnabled = true;
  }

  confirmDialog() {
    const dialog = document.querySelector("#confirm-dialog");
    dialog.showModal();
    dialog.addEventListener("close", () => {
      if (dialog.returnValue === "yes") {
        this.stop();
      }
    });
  }

  isValidEntry({ lastNote }) {
    if (lastNote && !/^\d{2}\:\d{2}/.test(lastNote)) {
      return true;
    }
    return false;
  }

  addNewNote({ event }) {
    if (event.key.toUpperCase() === "ENTER") {
      event.preventDefault();
      const notes = this.notes.split("\n");
      const lastNote = notes.pop();
      if (this.isValidEntry({ lastNote })) {
        notes.push(`${secondsToHms(this.elapsedSeconds)} - ${lastNote}\n`);
        this.notes = notes.join("\n");
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
          <div class="controls pt-4 pb-6">
            <img class="w-48" src="/notehack.svg"/>
            <div class="time text-slate-700 text-3xl">
              {secondsToHms(this.elapsedSeconds)}
            </div>
            <div>
              <Button color="secondary" class="mr-3 w-28 justify-center" onclick={this.startPause}>
                {this.timerId ? (
                  <PauseIcon class="mr-1.5" />
                ) : (
                  <PlayIcon class="mr-1.5" />
                )}
                {this.timerId ? "Pause" : "Start"}
              </Button>
              <Button variant="outlined" color="danger" disabled={!this.timerId} onclick={this.confirmDialog}>
                <StopIcon class="mr-1.5" />
                Stop
              </Button>
            </div>
          </div>
          <div class="notes">
            <Textarea
              bind={this.notes}
              disabled={this.isNoteEnabled}
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
            <div class="bg-green-500 py-2 px-4 max-w-fit rounded-md mx-auto drop-shadow-md">
                <CircleCheckIcon class="mr-2"/>
                Successfully copied to clipboard!
            </div>
        )}
      </section>
    );
  }
}

export default Home;
