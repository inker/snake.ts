type Callback = (numFrames: number) => void

export default class GameLoop {
  interval: number
  callback: Callback
  private lastTimeStamp = -1
  private running = false

  constructor(interval: number, callback: Callback) {
    this.interval = interval
    this.callback = callback
  }

  start() {
    this.running = true
    window.requestAnimationFrame((timestamp) => {
      this.lastTimeStamp = timestamp
      window.requestAnimationFrame(this.step)
    })
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
      this.lastTimeStamp = timestamp
      for (let i = 0; i < ratio; ++i) {
        this.callback(ratio)
      }
    }
    window.requestAnimationFrame(this.step)
  }

}
