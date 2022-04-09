import Button from "./Button";

export default function Confirm() {
  return (
    <dialog id="confirm-dialog" class="p-6 rounded-md drop-shadow-md mx-auto mt-[10%]">
      <form method="dialog">
        <p class="mb-4 text-lg">⚠️ Do you want stop the timer?️</p>
        <menu class="flex justify-end">
            <Button variant="outlined" color="default" class="mr-2.5" value="no">No</Button>
            <Button color="danger" value="yes">Yes</Button>
        </menu>
      </form>
    </dialog>
  );
}
