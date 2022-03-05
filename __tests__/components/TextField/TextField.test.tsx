/* eslint-disable @typescript-eslint/no-empty-function */
import { TextField } from 'src/components'

import { render, screen, fireEvent } from '@testing-library/react'

const defaultProps = {
  type: 'text',
  label: 'Label',
  defaultValue: 'Default Value',
  value: '',
}

describe('TextField', () => {
  it('renders', () => {
    render(<TextField {...defaultProps} onChange={() => {}} />)
  })

  it('should call onChange prop with input value', () => {
    const mock = jest.fn()
    render(<TextField {...defaultProps} onChange={mock} />)
    const textField = screen.getByPlaceholderText('Default Value')
    fireEvent.change(textField, { target: { value: 'test' } })

    expect(mock).toHaveBeenCalled()
  })
})
