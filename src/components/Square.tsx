import React, { PureComponent } from 'react'

import Point from 'utils/Point'
import Rect from './Rect'

interface Props {
  coordinates: Point,
  [prop: string]: any,
}

class Square extends PureComponent<Props> {
  render() {
    const { props } = this
    const { x, y } = props.coordinates
    return (
      <Rect
        key={`${x},${y}`}
        color="red"
        x={x}
        y={y}
        width={1}
        height={1}
        {...props}
      />
    )
  }
}

export default Square
