export default function Textarea(props) {
  const {
    id,
    name,
    rows = 4,
    source,
    disabled,
    onkeydown,
  } = props

  const value = source[name]

  return (
    <textarea
      rows={rows}
      id={id}
      onkeydown={onkeydown}
      class={
        'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-slate-700'
      }
      disabled={disabled}
      bind={source[name]}
      default
    >
      {value}
    </textarea>
  )
}
