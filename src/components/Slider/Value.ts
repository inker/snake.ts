import styled from 'styled-components'

interface Props {
  disabled: boolean,
}

const Value = styled.div<Props>`
  width: 30px;
  color: ${props => props.disabled ? '#999' : ''};
`

export default Value
