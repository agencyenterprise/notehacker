export default function listenToShortcuts() {
  document.addEventListener('keypress', (event) => {
    // console.log('key pressed', event.shiftKey, event.ctrlKey, event.code)
    // Zen Mode
    if (event.shiftKey && event.ctrlKey && event.code === 'KeyZ') {
      document.querySelector('textarea').classList.toggle('zenmode')
    }
    // Start/Pause
    if (event.shiftKey && event.ctrlKey && event.code === 'KeyS') {
      document.getElementById('btn-start-pause').click()
    }
    // Stop
    if (event.shiftKey && event.ctrlKey && event.code === 'KeyX') {
      document.getElementById('btn-stop').click()
    }
    // Edit timestamp
    if (event.shiftKey && event.ctrlKey && event.code === 'KeyE') {
      const container = document.getElementById('elapsed-container')
      container.focus()
      container.setSelectionRange(7,8)
    }
  })
}
