import { useEffect } from 'react'

export default (
  name: string,
  handler?: null | undefined | EventListenerOrEventListenerObject,
  target: null | Node | Window = window,
  options?: AddEventListenerOptions,
) => {
  useEffect(() => {
    if (!handler || !target) {
      return
    }

    target.addEventListener(name, handler, options)
    return () => {
      target.removeEventListener(name, handler)
    }
  }, [name, handler, target, JSON.stringify(options)])
}
