import {
  useState,
  useCallback,
} from 'react'

type StateSet<T> = (state: T) => T

export default <T>(key: string, initialValue: T) => {
    // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item
        ? JSON.parse(item)
        : initialValue
    } catch (err) {
      // If error also return initialValue
      console.error(err)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback((value: T | StateSet<T>) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      // A more advanced implementation would handle the error case
      console.error(err)
    }
  }, [setStoredValue])

  const reset = useCallback(() => {
    setStoredValue(initialValue)
    try {
      window.localStorage.removeItem(key)
    } catch (err) {
      console.error(err)
    }
  }, [setStoredValue])

  return [storedValue, setValue, reset] as const
}
