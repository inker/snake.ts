import styled from 'styled-components'

interface Props {
  visible: boolean,
}

const Svg = styled.svg<Props>`
  display: ${props => props.visible ? '' : 'none'};
`

export default Svg
