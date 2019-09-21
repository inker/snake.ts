import {
  useEffect,
} from 'react'

export default <K extends keyof WindowEventMap>(
  eventType: K,
  cb: (e: WindowEventMap[K]) => void,
) => {
  useEffect(() => {
    window.addEventListener(eventType, cb)
    return () => {
      window.removeEventListener(eventType, cb)
    }
  }, [])
}
