import { useState, useCallback } from 'react'

export default <State extends { [key: string]: any }>(initialState: State) => {
  const [state, setPartialState] = useState(initialState)
  const setState = useCallback((key: keyof State, value: State[keyof State]) => {
    setPartialState({
      ...state,
      [key]: value,
    })
  }, [setPartialState])

  return [state, setState] as const
}
