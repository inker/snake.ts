import {
  useState,
  useCallback,
} from 'react'

export default <State extends { [key: string]: any }>(
  initialState: State = {} as State,
): [State, (patch: Partial<State> | ((prevState: State) => Partial<State>)) => void] => {
  const [state, setState] = useState<State>(initialState)
  const setStateNew = useCallback(patch => {
    const newState = typeof patch === 'function' ? patch(prevState) : patch
    setState(prevState => ({
      ...prevState,
      ...newState,
    }))
  }, [setState])

  return [state, setStateNew]
}
