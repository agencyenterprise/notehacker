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

class Home extends Nullstack {
  elapsedSeconds = 0;
  elapsedTime = "00:00:00";
  timerId;
  notes = "";
  isNoteEnabled = true;

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

  addNewNote({ event }) {
    if (event.key.toUpperCase() === "ENTER") {
      event.preventDefault();
      const notes = this.notes.split("\n");
      const lastNote = notes.pop();
      if (lastNote) {
        notes.push(`${secondsToHms(this.elapsedSeconds)} - ${lastNote}\n`);
        this.notes = notes.join("\n");
      }
    }
  }

  copyToClipboard() {
    copy(this.notes);
  }

  render() {
    return (
      <section>
        <div class="wrapper">
          <div class="controls pb-2">
            <div class="time text-slate-700 text-3xl">
              {secondsToHms(this.elapsedSeconds)}
            </div>
            <div>
              <Button class="mr-2" onclick={this.startPause}>
                {this.timerId ? (
                  <PauseIcon class="mr-1" />
                ) : (
                  <PlayIcon class="mr-1" />
                )}
                {this.timerId ? "Pause" : "Play"}
              </Button>
              <Button disabled={!this.timerId} onclick={this.confirmDialog}>
                <StopIcon class="mr-1" />
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
            <Button
              onclick={this.copyToClipboard}
              id="btn-clipboard"
              class="my-2 px-2 py-1 bg-indigo-400 hover:bg-indigo-500"
            >
              <CopyIcon class="h-4 w-4 mr-1" />
              Copy to clipboard
            </Button>
          </div>
        </div>
        <Confirm />
      </section>
    );
  }
}

export default Home;
