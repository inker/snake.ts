import React, { PureComponent } from 'react'

import Point from 'utils/Point'

interface Props {
  coordinates: Point,
  [prop: string]: any,
}

class Square extends PureComponent<Props> {
  render() {
    const { props } = this
    const { x, y } = props.coordinates
    return (
      <rect
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
