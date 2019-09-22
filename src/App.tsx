import React, {
  useCallback,
  memo,
} from 'react'
import styled from 'styled-components'
import { uniqueId } from 'lodash'

import config from './config.json'

import Game from 'pages/Game'
import NavBar from 'components/NavBar'
import usePartialState from 'utils/hooks/usePartialState'
import useEvent from 'utils/hooks/useEvent'

// @ts-ignore
import(/* webpackChunkName: "version" */ './version')

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
  gameOver: boolean,
}

const App = (props: Props) => {
  const [state, setState] = usePartialState<State>({
    gameId: uniqueId('gameid-'),
    values: {
      width: config.size.default.width,
      height: config.size.default.height,
      speed: config.speed.default,
    },
    score: 0,
    running: true,
    gameOver: false,
  })

  const {
    gameId,
    values,
    score,
    running,
    gameOver,
  } = state

  const onTogglePause = useCallback(() => {
    setState({
      running: !running,
    })
  }, [running, setState])

  const onRestart = useCallback(() => {
    setState({
      gameId: uniqueId('gameid-'),
      running: true,
      gameOver: false,
      score: 0,
    })
  }, [setState])

  const onGameOver = useCallback(() => {
    setState({
      running: false,
      gameOver: true,
    })
  }, [setState])

  const onScoreChange = useCallback((score: number) => {
    setState({
      score,
    })
  }, [setState])

  const onSettingChange = useCallback((setting: any, value: number) => {
    setState({
      values: {
        ...values,
        [setting]: value,
      },
    })
  }, [values, setState])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e
    if (keyCode === 32) {
      // space
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
        values={values}
        score={score}
        onRestart={onRestart}
        onSettingChange={onSettingChange}
        onTogglePause={onTogglePause}
      />
      <Game
        gameId={gameId}
        running={running}
        width={values.width}
        height={values.height}
        speed={values.speed}
        initialLength={config.initialLength}
        score={score}
        onScoreChange={onScoreChange}
        onGameOver={onGameOver}
      />
    </Root>
  )
}

export default memo(App)
