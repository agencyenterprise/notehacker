import Nullstack from "nullstack";
import "./Home.scss";

import { secondsToHms } from "./services/ElapsedTimer";

class Home extends Nullstack {
  elapsedSeconds = 0;
  elapsedTime = "00:00:00";
  timerId;
  notes = "";

  startPause() {
    if (!this.timerId) {
      this.timerId = setInterval(() => ++this.elapsedSeconds, 1000);
      return;
    }
    this.timerId = clearInterval(this.timerId);
  }

  stop() {
    this.timerId = clearInterval(this.timerId);
    this.elapsedSeconds = 0;
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

  prepare({ project, page }) {
    page.title = `${project.name}`;
    page.description = `${project.name} was made with Nullstack`;
  }

  render({ project }) {
    return (
      <section>
        <div class="wrapper">
          <div class="controls">
            <button onclick={this.confirmDialog}>Stop</button>
            <div class="time">{secondsToHms(this.elapsedSeconds)}</div>
            <button onclick={this.startPause}>Play/Pause</button>
          </div>
          <div class="note">
            <input id="input-note" type="text" required disabled />
          </div>
          <div class="notes">
            <textarea bind={this.notes}></textarea>
            <button id="btn-clipboard">Copy to clipboard</button>
            <button id="btn-delete-notes">Delete notes</button>
          </div>
        </div>
        <dialog id="confirm-dialog">
          <form method="dialog">
            <p>Do you want stop the timer?</p>
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
