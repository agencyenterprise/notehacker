import clsx from 'clsx';

export default function PauseIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" class={clsx("h-6 w-6", props.class)} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
