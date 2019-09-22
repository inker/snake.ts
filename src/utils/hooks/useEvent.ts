import { useEffect } from 'react'

type Handler = (event?: any) => void

export interface UseEventTarget {
  addEventListener(name: string, handler: Handler, ...args: any[]): void,
  removeEventListener(name: string, handler: Handler): void,
}

const defaultTarget = typeof window === 'object' ? window : null

export default (
  name: string,
  handler?: null | undefined | Handler,
  target: null | Node | Window = defaultTarget,
  options?: AddEventListenerOptions,
) => {
  useEffect(() => {
    if (!handler || !target) {
      return
    }

    target!.addEventListener(name, handler, options)
    return () => {
      target!.removeEventListener(name, handler)
    }
  }, [name, handler, target, JSON.stringify(options)])
}
