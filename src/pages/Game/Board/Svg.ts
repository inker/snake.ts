import styled from 'styled-components'

interface Props {
  visible: boolean,
}

const attrs = {
  xmlns: 'http://www.w3.org/2000/svg',
}

const Svg = styled.svg.attrs(attrs)<Props>`
  display: ${props => props.visible ? '' : 'none'};
`

export default Svg
