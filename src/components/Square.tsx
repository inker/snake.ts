import {
  memo,
  SVGProps,
} from 'react'

import Point from 'utils/Point'

interface Props extends SVGProps<SVGRectElement> {
  coordinates: Point,
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
