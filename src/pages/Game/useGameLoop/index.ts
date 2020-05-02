import {
  useRef,
  useEffect,
} from 'react'

import GameLoop from './GameLoop'

export default (run: boolean, interval: number, onLoopUpdate: (numFrames: number) => void) => {
  const { current: gameLoop } = useRef(new GameLoop(interval, onLoopUpdate))

  gameLoop.interval = interval
  gameLoop.onUpdate = onLoopUpdate

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      gameLoop.stop()
    }
  }, [])

  useEffect(() => {
    gameLoop[run ? 'start' : 'stop']()
  }, [run])
}
