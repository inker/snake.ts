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
  key: string,
  width: number,
  height: number,
  speed: number,
  score: number,
  running: boolean,
}

class App extends PureComponent<Props, State> {
  state: State = {
    key: uniqueId('key-'),
    width: config.size.default.width,
    height: config.size.default.height,
    speed: config.speed.default,
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
      key: uniqueId('key-'),
    })
  }

  onScoreChange = (score: number) => {
    this.setState({
      score,
    })
  }

  onSettingChange = (setting: any, value: number) => {
    this.setState({
      [setting]: value,
    })
  }

  render() {
    const { state } = this
    return (
      <Root>
        <NavBar
          paused={!state.running}
          refresh={this.onRefresh}
          onSettingChange={this.onSettingChange}
          onTogglePause={this.onTogglePause}
          values={{
            width: state.width,
            height: state.height,
            speed: state.speed,
          }}
        />
        <Game
          key={state.key}
          running={state.running}
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
