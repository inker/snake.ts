import {
  useState,
  useCallback,
} from 'react'

import Direction from 'utils/Direction'

import directionByKeyCode from 'utils/directionByKeyCode'
import useEvent from './useEvent'

export default () => {
  const [direction, setDirection] = useState<Direction>(-1)

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const dir = directionByKeyCode(e.keyCode)
    if (dir < 0) {
      return
    }
    setDirection(dir)
  }, [setDirection])

  useEvent('keydown', onKeyDown)

  const reset = useCallback(() => {
    setDirection(-1)
  }, [setDirection])

  return [direction, reset] as const
}
