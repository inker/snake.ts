import {
  useState,
  useCallback,
} from 'react'

import Direction from 'utils/Direction'
import directionsAreOpposite from 'utils/directionsAreOpposite'

import useArrowKeys from 'utils/hooks/useArrowKeys'

export default (initialDirection: Direction) => {
  const [proposedDir, reset] = useArrowKeys()
  const [lastDir, setLastDir] = useState<Direction>(initialDirection)

  const realDir = proposedDir < 0
    ? initialDirection
    : directionsAreOpposite(lastDir, proposedDir)
      ? lastDir
      : proposedDir

  const syncDir = useCallback(() => {
    setLastDir(realDir)
  }, [realDir, setLastDir])

  return [realDir, syncDir, reset] as const
}
