import {
  FC,
  memo,
} from 'react'

import Grid from 'components/Grid'

import Root from './Root'
import Svg from './Svg'

const MAX_SVG_WIDTH = 700
const MAX_SVG_HEIGHT = 500

function getDimensions(w: number, h: number) {
  const rX = MAX_SVG_WIDTH / w
  const rY = MAX_SVG_HEIGHT / h
  const min = Math.min(rX, rY)
  return {
    width: w * min,
    height: h * min,
  }
}

interface Props {
  width: number,
  height: number,
  paused: boolean,
  popup?: React.ReactElement<any> | null,
}

const Board: FC<Props> = ({
  width,
  height,
  paused,
  popup,
  children,
}) => {
  const svgDimensions = getDimensions(width, height)

  return (
    <Root
      width={svgDimensions.width}
      height={svgDimensions.height}
      paused={paused}
    >
      <Svg
        width={svgDimensions.width}
        height={svgDimensions.height}
        viewBox={`0 0 ${width} ${height}`}
        visible={!popup}
      >
        <Grid size={1} />
        {children}
      </Svg>
      {popup}
    </Root>
  )
}

export default memo(Board) as typeof Board
