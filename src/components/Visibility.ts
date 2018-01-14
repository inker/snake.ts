import styled from 'styled-components'

const Visibility = styled.div`
  // @ts-ignore
  visibility: ${props => props.visible ? '' : 'hidden'};
`

export default Visibility
