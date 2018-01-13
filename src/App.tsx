import React, { PureComponent } from 'react'
import Import from 'react-import'
import styled from 'styled-components'

import Popup from 'components/Popup'

import Game from './Game'

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;
`

interface Props {}

interface State {
  initial: boolean,
  waiting: boolean,
  error: string | null,
}

class App extends PureComponent<Props, State> {
  state: State = {
    initial: true,
    waiting: true,
    error: null,
  }

  render() {
    return (
      <Root>
        <Game
          width={20}
          height={20}
        />
      </Root>
    )
  }
}

export default App
