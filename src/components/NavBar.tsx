import React, { memo, useCallback } from 'react'
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
  paused: boolean,
  gameOver: boolean,
  values: {
    width: number,
    height: number,
    speed: number,
  },
  score: number,
  onTogglePause?: () => void,
  onRestart?: () => void,
  onSettingChange?: (setting: string, value: number) => void,
}

const Navbar = ({
  paused,
  gameOver,
  values,
  score,
  onTogglePause,
  onRestart,
  onSettingChange,
}: Props) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const { variable } = input.dataset
    if (variable && onSettingChange) {
      onSettingChange(variable, +input.value)
    }
  }, [onSettingChange])

  return (
    <Root>
      <Score>
        Score: {score}
      </Score>
      <Button
        disabled={gameOver}
        onClick={onTogglePause}
      >
        {paused ? 'Resume' : 'Pause'}
      </Button>
      <Button onClick={onRestart}>
        Restart
      </Button>
      <Slider
        disabled={!paused}
        value={values.width}
        min={config.size.min.width}
        max={config.size.max.width}
        defaultValue={config.size.default.width}
        data-variable="width"
        onChange={onChange}
      />
      <Slider
        disabled={!paused}
        value={values.height}
        min={config.size.min.height}
        max={config.size.max.height}
        defaultValue={config.size.default.height}
        data-variable="height"
        onChange={onChange}
      />
      <Slider
        disabled={!paused}
        value={values.speed}
        min={config.speed.min}
        max={config.speed.max}
        defaultValue={config.speed.default}
        data-variable="speed"
        onChange={onChange}
      />
    </Root>
  )
}

export default memo(Navbar)
