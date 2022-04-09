import clsx from 'clsx';

const styles = {
    base: "inline-flex items-center px-4 py-2 text-sm text-white font-medium rounded-md shadow-sm",
    contained: {
        base: "border border-transparent",
        primary: "bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        danger: "bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
    },
    outlined: {
        base: "border",
        default: "border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 text-slate-700",
        danger: "border-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-red-700",
    }
}

export default function Button(props) {
    const { type, onclick, children, value, disabled = false, color = "primary", variant = "contained" } = props;
    const klass = clsx(
        styles.base,
        styles[variant].base,
        styles[variant][color],
        props.class
    );

    return (
        <button disabled={disabled} type={type} onclick={onclick} value={value} class={klass}>
          {children}
        </button>
    );
}
