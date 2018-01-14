type OnUpdate = (numFrames: number) => void

export default class GameLoop {
  interval: number
  onUpdate: OnUpdate
  private lastTimeStamp = -1
  private running = false

  constructor(interval: number, onUpdate: OnUpdate) {
    this.interval = interval
    this.onUpdate = onUpdate
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
        this.onUpdate(ratio)
      }
    }
    window.requestAnimationFrame(this.step)
  }

}
