export default class ElapsedTimer {
  #elapsedSeconds = 0
  #timerId = null
  #milliseconds = 0
  #action = null

  constructor(callback, milliseconds = 1000) {
    this.#action = callback
    this.#milliseconds = milliseconds
  }

  toggleTimer() {
    if (this.#timerId) {
      this.#timerId = clearInterval(this.#timerId)
      return
    }

    const performAction = () => {
      ++this.#elapsedSeconds
      this.#action(secondsToHms(this.#elapsedSeconds))
    }

    this.#timerId = setInterval(performAction, this.#milliseconds)
  }

  stopTimer() {
    this.#timerId = clearInterval(this.#timerId)
    this.#elapsedSeconds = 0
    this.#action(secondsToHms(this.#elapsedSeconds))
  }

  lap() {
    return secondsToMin(this.#elapsedSeconds)
  }
}

export function secondsToHms(elapsedSeconds) {
  const hours = Math.floor(elapsedSeconds / 3600)
  const minutes = Math.floor((elapsedSeconds % 3600) / 60)
  const seconds = Math.floor((elapsedSeconds % 3600) % 60)

  const pad = (value) => (value < 10 ? '0' + value : value)

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
}

export function secondsToMin(elapsedSeconds) {
  return elapsedSeconds / 60
}
