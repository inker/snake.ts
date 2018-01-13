export default (interval: number, cb: () => void) => {
  let lastTimeStamp = -1
  const step = (timestamp: number) => {
    const diff = timestamp - lastTimeStamp
    if (diff >= interval) {
      lastTimeStamp -= interval
      cb()
    }
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}
