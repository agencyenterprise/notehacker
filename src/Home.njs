import Nullstack from "nullstack";
import "./Home.scss";
import { secondsToHms, secondsToMin } from "./services/ElapsedTimer";
import Button from "./components/Button";
import Textarea from "./components/Textarea";

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

  getNoteMinute() {
    const minutes = secondsToMin(this.elapsedSeconds).toFixed(0);
    return String(minutes).padStart(2, '0') + 'm';
  }

  addNewNote({ event }) {
    if (event.key.toUpperCase() === "ENTER") {
      event.preventDefault();
      const notes = this.notes.split('\n');
      const lastNote = notes.pop();
      notes.push(`${this.getNoteMinute()} - ${lastNote}\n`);
      this.notes = notes.join('\n');
    }
  }

  render() {
    return (
      <section>
        <div class="wrapper">
          <div class="controls">
            <Button onclick={this.confirmDialog}>Stop</Button>
            <div class="time" style="color: #000">
              {secondsToHms(this.elapsedSeconds)}
            </div>
            <Button onclick={this.startPause}>Play/Pause</Button>
          </div>
          <div class="notes">
            <Textarea
              bind={this.notes}
              disabled={this.isNoteEnabled}
              onkeydown={this.addNewNote}
            ></Textarea>
            <Button id="btn-clipboard" class="my-2">Copy to clipboard</Button>
          </div>
        </div>
        <dialog id="confirm-dialog" class="p-6">
          <form method="dialog">
            <p>⚠️ Do you want stop the timer? Your notes will be deleted! ⚠️</p>
            <menu>
              <Button value="no" class="mr-2.5">No</Button>
              <Button value="yes">Yes</Button>
            </menu>
          </form>
        </dialog>
      </section>
    );
  }
}

export default Home;
