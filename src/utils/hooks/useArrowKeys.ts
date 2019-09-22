import {
  useState,
  useCallback,
} from 'react'

import Direction from 'utils/Direction'

import directionByKeyCode from 'utils/directionByKeyCode'
import directionsAreOpposite from 'utils/directionsAreOpposite'
import useEvent from './useEvent'

export default (initialDirection: Direction) => {
  const [direction, setDirection] = useState<Direction>(initialDirection)
  const [lastDirection, setLastDirection] = useState<Direction>(initialDirection)
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const dir = directionByKeyCode(e.keyCode)
    if (dir < 0 || dir === lastDirection || directionsAreOpposite(lastDirection, dir)) {
      return
    }
    setDirection(dir)
  }, [lastDirection, setDirection])

  useEvent('keydown', onKeyDown)

  return [direction, setDirection, setLastDirection] as const
}
