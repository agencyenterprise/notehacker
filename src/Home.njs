import Nullstack from "nullstack";
import "./Home.scss";
import { secondsToHms } from "./services/ElapsedTimer";
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
    this.isNoteEnabled = true;
    this.timerId = clearInterval(this.timerId);
  }

  stop() {
    this.timerId = clearInterval(this.timerId);
    this.elapsedSeconds = 0;
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

  addNewNote() {
    console.log('[dev] new note added')
  }

  render() {
    return (
      <section>
        <div class="wrapper">
          <div class="controls">
            <Button onclick={this.confirmDialog}>Stop</Button>
            <div class="time">{secondsToHms(this.elapsedSeconds)}</div>
            <Button onclick={this.startPause}>Play/Pause</Button>
          </div>
          <div class="notes">
            <Textarea bind={this.notes} disabled={this.isNoteEnabled} oninput={this.addNewNote}></Textarea>
            <button id="btn-clipboard">Copy to clipboard</button>
          </div>
        </div>
        <dialog id="confirm-dialog">
          <form method="dialog">
            <p>⚠️ Do you want stop the timer? Your notes will be deleted! ⚠️</p>
            <menu>
              <button value="no">No</button>
              <button value="yes">Yes</button>
            </menu>
          </form>
        </dialog>
      </section>
    );
  }
}

export default Home;
