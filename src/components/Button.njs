import clsx from 'clsx';

const style = "inline-flex items-center px-4 py-2 border border-transparent text-sm text-white font-medium rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Button(props) {
  const { type = "button", onclick = () => {}, children } = props;

  return (
    <button type={type} onclick={onclick}  class={clsx(style, props.class)}>
      {children}
    </button>
  );
}
