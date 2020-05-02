import React, {
  memo,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'

import { capitalize } from 'lodash'

import Root from './Root'
import Label from './Label'
import Value from './Value'
import Range from './Range'

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props extends Omit<InputProps, 'ref' | 'defaultValue'> {
  value: number,
  min: number,
  max: number,
  defaultValue?: number,
  disabled: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Slider = ({
  value,
  defaultValue,
  ...otherProps
}: Props) => (
  <Root>
    <Label disabled={otherProps.disabled}>
      {capitalize(otherProps['data-variable'])}
      <Range
        value={value}
        defaultValue={defaultValue === undefined ? undefined : defaultValue.toString()}
        {...otherProps}
      />
    </Label>
    <Value disabled={otherProps.disabled}>
      {value}
    </Value>
  </Root>
)

export default memo(Slider)
