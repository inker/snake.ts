import styled from 'styled-components'

interface Props {
  disabled: boolean,
}

const Label = styled.label<Props>`
  display: flex;
  flex-direction: column;
  color: ${props => props.disabled ? '#999' : ''};
`

export default Label
