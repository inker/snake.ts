import React, { PureComponent } from 'react'
import styled from 'styled-components'
import fastclick from 'fastclick'
import { uniqueId } from 'lodash'

import config from './config.json'

import Game from 'pages/Game'
import Popup from 'components/Popup'
import NavBar from 'components/NavBar'

const Root = styled.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`

interface Props {}

interface State {
  initial: boolean,
  waiting: boolean,
  key: string,
  width: number,
  height: number,
  speed: number,
  score: number,
  error: string | null,
}

class App extends PureComponent<Props, State> {
  state: State = {
    key: uniqueId('key-'),
    initial: true,
    waiting: true,
    width: config.size.default.width,
    height: config.size.default.height,
    speed: config.size.default.speed,
    score: 0,
    error: null,
  }

  onRefresh = () => {
    this.setState({
      key: uniqueId('key-'),
    })
  }

  onScoreChange = (score: number) => {
    this.setState({
      score,
    })
  }

  onWidthChange = (value: number) => {
    this.setState({
      width: value,
    })
  }

  onHeightChange = (value: number) => {
    this.setState({
      height: value,
    })
  }

  onSpeedChange = (value: number) => {
    this.setState({
      speed: value,
    })
  }

  render() {
    const { state } = this
    return (
      <Root>
        <NavBar
          refresh={this.onRefresh}
          onWidthChange={this.onWidthChange}
          onHeightChange={this.onHeightChange}
          onSpeedChange={this.onSpeedChange}
        />
        <Game
          key={state.key}
          width={state.width}
          height={state.height}
          speed={state.speed}
          initialLength={config.initialLength}
          onScoreChange={this.onScoreChange}
        />
      </Root>
    )
  }
}

export default App

// @ts-ignore
fastclick.attach(document.body)
