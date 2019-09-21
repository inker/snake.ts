import React, { memo } from 'react'

import Point from 'utils/Point'

interface Props {
  coordinates: Point,
  [prop: string]: any,
}

const Square = ({
  coordinates,
  ...props
}: Props) => {
  const { x, y } = coordinates
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

export default memo(Square)
