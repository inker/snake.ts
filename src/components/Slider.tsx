import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { capitalize } from 'lodash'

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin: 10px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  // @ts-ignore
  color: ${props => props.disabled ? '#999' : ''};
`

const Input = styled.input`
  width: 150px;
`

const Value = styled.div`
  width: 30px;
  // @ts-ignore
  color: ${props => props.disabled ? '#999' : ''};
`

interface Props {
  value: number,
  min: number,
  max: number,
  defaultValue: number,
  disabled: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  [prop: string]: any,
}

class Slider extends PureComponent<Props> {
  render() {
    const { value, ...props } = this.props
    return (
      <Root>
        <Label
          // @ts-ignore
          disabled={props.disabled}
        >
          {capitalize(props['data-variable'])}
          <Input
            // @ts-ignore
            type="range"
            {...props}
          />
        </Label>
        <Value
          // @ts-ignore
          disabled={props.disabled}
        >
          {value}
        </Value>
      </Root>
    )
  }
}

export default Slider
