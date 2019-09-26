import { useCallback } from 'react'

interface State<V> {
  [key: string]: V,
}

type Setter<T> = (state: Readonly<State<T>>) => State<T>
type StateSet<T> = (val: Setter<T> | Readonly<State<T>>) => void

export default <T>(setter: StateSet<T>) =>
  useCallback((key: string, value: T) => {
    setter(state => ({
      ...state,
      [key]: value,
    }))
  }, [setter])
