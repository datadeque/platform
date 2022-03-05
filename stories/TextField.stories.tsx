/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { TextField } from '../src/components'

export default {
  title: 'Components/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>

const defaultProps = {
  type: 'text',
  label: 'Label',
  defaultValue: 'Default Value',
  value: '',
  onChange: () => {},
}

export const TextFieldDefault = () => <TextField {...defaultProps} />

export const TextFieldStandard = () => (
  <TextField {...defaultProps} variant="standard" />
)

export const TextFieldOutlined = () => (
  <TextField {...defaultProps} variant="outlined" />
)

export const TextFieldStandardError = () => (
  <TextField {...defaultProps} variant="standard" error="Error" />
)

export const TextFieldOutlinedError = () => (
  <TextField {...defaultProps} variant="outlined" error="Error" />
)
