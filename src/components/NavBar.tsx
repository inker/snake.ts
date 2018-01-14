import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Slider from 'rc-slider'

import config from 'config.json'

// import ALink from 'components/ALink'
import DivLink from 'components/DivLink'

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`

interface Props {
  refresh: () => void,
  onWidthChange: (value: number) => void,
  onHeightChange: (value: number) => void,
  onSpeedChange: (value: number) => void,
}

class Navbar extends PureComponent<Props> {
  render() {
    const { props } = this
    return (
      <Root>
        {location &&
          <DivLink onClick={props.refresh}>
            Restart
          </DivLink>
        }
        <Slider
          min={config.size.min.width}
          max={config.size.max.width}
          defaultValue={config.size.default.width}
          onAfterChange={props.onWidthChange}
        />
        <Slider
          min={config.size.min.height}
          max={config.size.max.height}
          defaultValue={config.size.default.height}
          onAfterChange={props.onHeightChange}
        />
        <Slider
          min={config.speed.min}
          max={config.speed.max}
          defaultValue={config.speed.default}
          onAfterChange={props.onSpeedChange}
        />
      </Root>
    )
  }
}

export default Navbar
