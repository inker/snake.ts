import React, { PureComponent } from 'react'
import styled from 'styled-components'

import randomId from 'utils/randomId'

const patternId = `pattern-${randomId()}`

const GridPath = styled.path`
  fill: none;
  stroke: #ccc;
  stroke-width: 0.1;
`

interface Props {
  size: number,
}

class Grid extends PureComponent<Props> {
  render() {
    const { size } = this.props
    return (
      <>
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <GridPath d={`M ${size} 0 L 0 0 0 ${size}`} />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </>
    )
  }
}

export default Grid
