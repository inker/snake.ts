import {
  useRef,
  useCallback,
} from 'react'

import useEvent from './useEvent'

export default (cb: (e: KeyboardEvent) => void) => {
  const lastKey = useRef<number>()

  useEvent('keydown', useCallback((e: KeyboardEvent) => {
    lastKey.current = e.keyCode
  }, [cb, lastKey]))

  useEvent('keyup', useCallback((e: KeyboardEvent) => {
    if (lastKey.current === e.keyCode) {
      lastKey.current = undefined
      cb(e)
    }
  }, [cb, lastKey]))
}
