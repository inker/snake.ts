import React, {
  useState,
  useCallback,
} from 'react'
import styled from 'styled-components'
import { uniqueId } from 'lodash'

import config from './config.json'

import Game from 'pages/Game'
import NavBar from 'components/NavBar'

import useEvent from 'utils/hooks/useEvent'
import useKeyValue from 'utils/hooks/useKeyValue'

// @ts-ignore
import(/* webpackChunkName: "version" */ './version')

const Root = styled.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`

interface Settings {
  width: number,
  height: number,
  speed: number,
}

interface State {
  running: boolean,
  gameOver: boolean,
}

const App = () => {
  const [state, setState] = useState<State>({
    running: true,
    gameOver: false,
  })

  const [settings, setSettings] = useKeyValue<Settings>({
    width: config.size.default.width,
    height: config.size.default.height,
    speed: config.speed.default,
  })

  const [gameId, setGameId] = useState(uniqueId('gameid-'))

  const [score, setScore] = useState(0)

  const {
    running,
    gameOver,
  } = state

  const onTogglePause = useCallback(() => {
    setState({
      running: !running,
      gameOver: false,
    })
  }, [running, setState])

  const onRestart = useCallback(() => {
    setState({
      running: true,
      gameOver: false,
    })
    setGameId(uniqueId('gameid-'))
    setScore(0)
  }, [setState, setScore])

  const onGameOver = useCallback(() => {
    setState({
      running: false,
      gameOver: true,
    })
  }, [setState])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e
    if (keyCode === 27) {
      // esc
      e.preventDefault()
      if (gameOver) {
        onRestart()
      } else {
        onTogglePause()
      }
      e.stopPropagation()
    }
  }, [gameOver, onRestart, onTogglePause])

  useEvent('keydown', onKeyDown)

  return (
    <Root>
      <NavBar
        paused={!running}
        gameOver={gameOver}
        values={settings}
        score={score}
        onRestart={onRestart}
        onSettingChange={setSettings}
        onTogglePause={onTogglePause}
      />
      <Game
        gameId={gameId}
        running={running}
        width={settings.width}
        height={settings.height}
        speed={settings.speed}
        initialLength={config.initialLength}
        score={score}
        onScoreChange={setScore}
        onGameOver={onGameOver}
      />
    </Root>
  )
}

export default App
