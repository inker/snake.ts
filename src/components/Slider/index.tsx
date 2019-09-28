import React, { memo } from 'react'
import styled from 'styled-components'
import { capitalize } from 'lodash'

import Label from './Label'
import Value from './Value'

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin: 10px;
`

const Input = styled.input`
  width: 150px;
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

const Slider = ({
  value,
  defaultValue,
  ...props
}: Props) => {
  return (
    <Root>
      <Label disabled={props.disabled}>
        {capitalize(props['data-variable'])}
        <Input
          type="range"
          value={value}
          defaultValue={defaultValue.toString()}
          {...props}
        />
      </Label>
      <Value disabled={props.disabled}>
        {value}
      </Value>
    </Root>
  )
}

export default memo(Slider)
