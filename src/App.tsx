import {
  useState,
  useCallback,
} from 'react'

import styled from 'styled-components'
import { uniqueId } from 'lodash'

import Game from 'pages/Game'
import NavBar from 'components/NavBar'

import useEvent from 'utils/hooks/useEvent'
import useKeyDownUp from 'utils/hooks/useKeyDownUp'
import useDictSet from 'utils/hooks/useDictSet'
import useSettings from 'utils/hooks/useSettings'

import config from './config.json'

// @ts-ignore
import(/* webpackChunkName: "version" */ './version')

const Root = styled.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`

interface State {
  isRunning: boolean,
  isGameOver: boolean,
  isStart: boolean,
}

const App = () => {
  const [state, setState] = useState<State>({
    isRunning: true,
    isGameOver: false,
    isStart: true,
  })

  const [settings, setSettings, resetSettings] = useSettings()

  const setSetting = useDictSet(setSettings)

  const [gameId, setGameId] = useState(uniqueId('gameid-'))

  const [score, setScore] = useState(0)

  const {
    isRunning,
    isGameOver,
    isStart,
  } = state

  const onTogglePause = useCallback(() => {
    setState({
      isRunning: !isRunning,
      isGameOver: false,
      isStart: false,
    })
  }, [isRunning, setState])

  const onRestart = useCallback(() => {
    setState({
      isRunning: true,
      isGameOver: false,
      isStart: false,
    })
    setGameId(uniqueId('gameid-'))
    setScore(0)
  }, [setState, setScore])

  const onGameOver = useCallback(() => {
    setState({
      isRunning: false,
      isGameOver: true,
      isStart: false,
    })
  }, [setState])

  const onKeyUp = useCallback(() => {
    if (isStart) {
      onRestart()
    }
  }, [isStart, onRestart])

  useKeyDownUp(onKeyUp)

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (isStart) {
      return
    }

    const { keyCode } = e
    if (keyCode === 27) {
      // esc
      e.preventDefault()
      if (isGameOver) {
        onRestart()
      } else {
        onTogglePause()
      }
      e.stopPropagation()
    }
  }, [isGameOver, isStart, onRestart, onTogglePause])

  useEvent('keydown', onKeyDown)

  return (
    <Root>
      <NavBar
        isPaused={!isRunning}
        isGameOver={isGameOver}
        isStart={isStart}
        values={settings}
        score={score}
        onRestart={onRestart}
        onSettingChange={setSetting}
        onResetSettings={resetSettings}
        onTogglePause={onTogglePause}
      />
      <Game
        gameId={gameId}
        isRunning={isRunning}
        isGameOver={isGameOver}
        isStart={isStart}
        score={score}
        width={settings.width}
        height={settings.height}
        speed={settings.speed}
        initialLength={config.initialLength}
        onScoreChange={setScore}
        onGameOver={onGameOver}
      />
    </Root>
  )
}

export default App
