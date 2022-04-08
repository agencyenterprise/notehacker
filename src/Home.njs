import Nullstack from "nullstack";
import "./Home.scss";

class Home extends Nullstack {
  prepare({ project, page }) {
    page.title = `${project.name}`;
    page.description = `${project.name} was made with Nullstack`;
  }

  render({ project }) {
    return (
      <section>
        <div class="wrapper">
          <div class="controls">
            <button id="btn-stop">Stop</button>
            <div class="time">00:00:00</div>
            <button id="btn-play">Play/Pause</button>
          </div>
          <div class="note">
            <input id="input-note" type="text" required disabled />
          </div>
          <div class="notes">
            <textarea name="" id="" cols="30" rows="10"></textarea>
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
