import React, { PureComponent } from 'react'
import styled from 'styled-components'

const MAX_SVG_WIDTH = 700
const MAX_SVG_HEIGHT = 500

function getDimensions(props: Props) {
  const rX = MAX_SVG_WIDTH / props.width
  const rY = MAX_SVG_HEIGHT / props.height
  const min = Math.min(rX, rY)
  const [width, height] = [props.width, props.height].map(i => i * min)
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

interface State {
  svgDimensions: {
    width: number,
    height: number,
  },
}

class Board extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      svgDimensions: getDimensions(props),
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this
    if (nextProps.width !== props.width || nextProps.height || props.height) {
      this.setState({
        svgDimensions: getDimensions(nextProps),
      })
    }
  }

  render() {
    const { props } = this
    const { svgDimensions } = this.state
    return (
      <Root
        // @ts-ignore
        width={svgDimensions.width}
        height={svgDimensions.height}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={svgDimensions.width}
          height={svgDimensions.height}
          viewBox={`0 0 ${props.width} ${props.height}`}
          // @ts-ignore
          visible={!props.popup}
        >
          {props.children}
        </Svg>
        {props.popup}
      </Root>
    )
  }
}

export default Board
