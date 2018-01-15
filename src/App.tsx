import React, { PureComponent } from 'react'
import styled from 'styled-components'
import fastclick from 'fastclick'
import { uniqueId } from 'lodash'

import config from './config.json'

import Game from 'pages/Game'
import NavBar from 'components/NavBar'

// @ts-ignore
import(/* webpackChunkName: "version" */ './version')

const Root = styled.div`
  display: flex;
  height: 100%;
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
  gameOver: boolean,
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
    gameOver: false,
  }

  onTogglePause = () => {
    this.setState({
      running: !this.state.running,
    })
  }

  onRestart = () => {
    this.setState({
      gameId: uniqueId('gameid-'),
      running: true,
      gameOver: false,
      score: 0,
    })
  }

  onGameOver = () => {
    this.setState({
      running: false,
      gameOver: true,
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
          gameOver={state.gameOver}
          values={values}
          score={state.score}
          onRestart={this.onRestart}
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
          onGameOVer={this.onGameOver}
        />
      </Root>
    )
  }
}

export default App

// @ts-ignore
fastclick.attach(document.body)
