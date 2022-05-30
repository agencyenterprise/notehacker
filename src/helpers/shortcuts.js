export default function shortcuts() {
  document.addEventListener('keypress', (event) => {
    // console.log('key pressed', event.shiftKey, event.ctrlKey, event.code)
    if (event.shiftKey && event.ctrlKey && event.code === 'KeyZ') {
      document.querySelector('textarea').classList.toggle('zenmode')
    }
  })
}
