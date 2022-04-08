import Button from "./Button";

export default function Confirm() {
  return (
    <dialog id="confirm-dialog" class="p-6">
      <form method="dialog">
        <p>⚠️ Do you want stop the timer? Your notes will be deleted! ⚠️</p>
        <menu>
          <Button value="no" class="mr-2.5">No</Button>
          <Button value="yes">Yes</Button>
        </menu>
      </form>
    </dialog>
  );
}
