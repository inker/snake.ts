export default class GameLoop {
  interval: number
  lastTimeStamp = -1
  running = false
  callback: () => void

  constructor(interval: number, callback: () => void) {
    this.interval = interval
    this.callback = callback
  }

  start() {
    this.running = true
    window.requestAnimationFrame(this.step)
    return this
  }

  stop() {
    this.running = false
    return this
  }

  private step = (timestamp: number) => {
    if (!this.running) {
      return
    }
    const diff = timestamp - this.lastTimeStamp
    if (diff >= this.interval) {
      this.lastTimeStamp -= this.interval
      this.callback()
    }
    window.requestAnimationFrame(this.step)
  }

}
