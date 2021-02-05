import { memo, useCallback } from 'react'
import styled from 'styled-components'

import config from 'config.json'

import Slider from './Slider'
import Button from './Button'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`

const Score = styled.div`
  margin: 10px;
  font-size: 18px;
`

interface Props {
  isPaused: boolean,
  isGameOver: boolean,
  isStart: boolean,
  values: {
    width: number,
    height: number,
    speed: number,
  },
  score: number,
  onTogglePause?: () => void,
  onRestart?: () => void,
  onSettingChange?: (setting: string, value: number) => void,
  onResetSettings?: () => void,
}

const Navbar = ({
  isPaused,
  isGameOver,
  isStart,
  values,
  score,
  onTogglePause,
  onRestart,
  onSettingChange,
  onResetSettings,
}: Props) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const { variable } = input.dataset
    if (variable && onSettingChange) {
      onSettingChange(variable, +input.value)
    }
  }, [onSettingChange])

  const gameStarted = !isGameOver && !isStart

  return (
    <Root>
      <Score>
        Score: {score}
      </Score>
      <Button
        disabled={isGameOver || isStart}
        onClick={onTogglePause}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </Button>
      <Button onClick={onRestart}>
        {isStart ? 'Start' : 'Restart'}
      </Button>
      <Slider
        disabled={gameStarted}
        value={values.width}
        min={config.size.min.width}
        max={config.size.max.width}
        defaultValue={values.width}
        data-variable="width"
        onChange={onChange}
      />
      <Slider
        disabled={gameStarted}
        value={values.height}
        min={config.size.min.height}
        max={config.size.max.height}
        defaultValue={values.height}
        data-variable="height"
        onChange={onChange}
      />
      <Slider
        disabled={!isPaused && gameStarted}
        value={values.speed}
        min={config.speed.min}
        max={config.speed.max}
        defaultValue={values.speed}
        data-variable="speed"
        onChange={onChange}
      />
      <Button
        disabled={gameStarted}
        onClick={onResetSettings}
      >
        Reset settings
      </Button>
    </Root>
  )
}

export default memo(Navbar)
