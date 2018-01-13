type Callback = () => void

export default class GameLoop {
  interval: number
  private lastTimeStamp = -1
  private running = false
  callback: Callback

  constructor(interval: number, callback: Callback) {
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
      const ratio = ~~(diff / this.interval)
      this.lastTimeStamp -= this.interval * ratio
      this.callback()
    }
    window.requestAnimationFrame(this.step)
  }

}
