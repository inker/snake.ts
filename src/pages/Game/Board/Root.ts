import styled, { css } from 'styled-components'

interface Props {
  width: number,
  height: number,
  paused: boolean,
}

const Root = styled.div<Props>`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : '100%'};
  border: 1px solid #999;

  ${props => props.paused && css`
    opacity: 0.25;
    transition: opacity 0.2s;
  `}
`

export default Root
