import Nullstack from "nullstack";
import copy from 'copy-to-clipboard';
import "./Home.scss";
import { secondsToHms, secondsToMin } from "./services/ElapsedTimer";
import Button from "./components/Button";
import Textarea from "./components/Textarea";
import Confirm from "./components/Confirm";
import CopyIcon from "./components/CopyIcon";

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

  copyToClipboard() {
    copy(this.notes);
  }

  render() {
    return (
      <section>
        <div class="wrapper">
          <div class="controls pb-2">
            <Button onclick={this.confirmDialog}>Stop</Button>
            <div class="time text-slate-700 text-3xl">
              {secondsToHms(this.elapsedSeconds)}
            </div>
            <Button onclick={this.startPause}>Play/Pause</Button>
          </div>
          <div class="notes">
            <Textarea
              bind={this.notes}
              disabled={this.isNoteEnabled}
              onkeydown={this.addNewNote}
            />
            <Button onclick={this.copyToClipboard} id="btn-clipboard" class="my-2 bg-indigo-400 hover:bg-indigo-500">
                <CopyIcon class="mr-1"/>
                Copy to clipboard
            </Button>
          </div>
        </div>
        <Confirm/>
      </section>
    );
  }
}

export default Home;
