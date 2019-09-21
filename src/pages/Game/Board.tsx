import React, {
  FC,
  useState,
  useEffect,
  memo,
} from 'react'
import styled from 'styled-components'

import Grid from 'components/Grid'

const MAX_SVG_WIDTH = 700
const MAX_SVG_HEIGHT = 500

function getDimensions(w: number, h: number) {
  const rX = MAX_SVG_WIDTH / w
  const rY = MAX_SVG_HEIGHT / h
  const min = Math.min(rX, rY)
  const [width, height] = [w, h].map(i => i * min)
  return {
    width,
    height,
  }
}

const Root = styled.div`
  // @ts-ignore
  width: ${props => props.width ? `${props.width}px` : '100%'};
  // @ts-ignore
  height: ${props => props.height ? `${props.height}px` : '100%'};
  border: 1px solid #999;
`

const Svg = styled.svg`
  // @ts-ignore
  display: ${props => props.visible ? '' : 'none'};
`

interface Props {
  width: number,
  height: number,
  popup?: React.ReactElement<any> | null,
}

interface Dimensions {
  width: number,
  height: number,
}

const Board: FC<Props> = ({
  width,
  height,
  popup,
  children,
}) => {
  const [svgDimensions, setSvgDimensions] = useState<Dimensions>(getDimensions(width, height))

  useEffect(() => {
    setSvgDimensions(getDimensions(width, height))
  }, [width, height])

  return (
    <Root
      width={svgDimensions.width}
      height={svgDimensions.height}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
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
