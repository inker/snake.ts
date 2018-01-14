import React, { PureComponent } from 'react'
import styled from 'styled-components'

import config from 'config.json'

// import ALink from 'components/ALink'
import DivLink from 'components/DivLink'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

interface Props {
  paused: boolean,
  values: {
    width: number,
    height: number,
    speed: number,
  },
  score: number,
  onTogglePause: () => void,
  onRefresh: () => void,
  onSettingChange: (setting: string, value: number) => void,
}

class Navbar extends PureComponent<Props> {
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const { variable } = input.dataset
    if (variable) {
      this.props.onSettingChange(variable, +input.value)
    }
  }

  render() {
    const { props } = this
    return (
      <Root>
        <DivLink onClick={props.onTogglePause}>
          {props.paused ? 'Resume' : 'Pause'}
        </DivLink>
        <DivLink onClick={props.onRefresh}>
          Restart
        </DivLink>
        <Label>
          Width ({props.values.width})
          <input
            type="range"
            disabled={!props.paused}
            min={config.size.min.width}
            max={config.size.max.width}
            defaultValue={config.size.default.width}
            data-variable="width"
            onChange={this.onChange}
          />
        </Label>
        <Label>
          Height ({props.values.height})
          <input
            type="range"
            disabled={!props.paused}
            min={config.size.min.height}
            max={config.size.max.height}
            defaultValue={config.size.default.height}
            data-variable="height"
            onChange={this.onChange}
          />
        </Label>
        <Label>
          Speed ({props.values.speed})
          <input
            type="range"
            disabled={!props.paused}
            min={config.speed.min}
            max={config.speed.max}
            defaultValue={config.speed.default}
            data-variable="speed"
            onChange={this.onChange}
          />
        </Label>
        Score: {props.score}
      </Root>
    )
  }
}

export default Navbar
