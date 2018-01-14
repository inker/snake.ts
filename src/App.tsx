import React, { PureComponent } from 'react'
import styled from 'styled-components'
import fastclick from 'fastclick'
import { uniqueId } from 'lodash'

import config from './config.json'

import Game from 'pages/Game'
// import Popup from 'components/Popup'
import NavBar from 'components/NavBar'

const Root = styled.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`

interface Props {}

interface State {
  gameId: string,
  values: {
    width: number,
    height: number,
    speed: number,
  },
  score: number,
  running: boolean,
}

class App extends PureComponent<Props, State> {
  state: State = {
    gameId: uniqueId('key-'),
    values: {
      width: config.size.default.width,
      height: config.size.default.height,
      speed: config.speed.default,
    },
    score: 0,
    running: true,
  }

  onTogglePause = () => {
    this.setState({
      running: !this.state.running,
    })
  }

  onRefresh = () => {
    this.setState({
      gameId: uniqueId('gameid-'),
      score: 0,
    })
  }

  onScoreChange = (score: number) => {
    this.setState({
      score,
    })
  }

  onSettingChange = (setting: any, value: number) => {
    this.setState({
      values: {
        ...this.state.values,
        [setting]: value,
      },
    })
  }

  render() {
    const { state } = this
    const { values } = state
    return (
      <Root>
        <NavBar
          paused={!state.running}
          values={values}
          score={state.score}
          onRefresh={this.onRefresh}
          onSettingChange={this.onSettingChange}
          onTogglePause={this.onTogglePause}
        />
        <Game
          gameId={state.gameId}
          running={state.running}
          width={values.width}
          height={values.height}
          speed={values.speed}
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
