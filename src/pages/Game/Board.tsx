import React, {
  FC,
  memo,
} from 'react'

import styled, { css } from 'styled-components'

import Grid from 'components/Grid'

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

const Root = styled.div`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : '100%'};
  border: 1px solid #999;

  ${props => props.paused && css`
    opacity: 0.25;
    transition: opacity 0.2s;
  `}
`

const Svg = styled.svg`
  display: ${props => props.visible ? '' : 'none'};
`

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
