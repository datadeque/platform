import { Button } from 'src/components'

import { render, screen, fireEvent } from '@testing-library/react'

const defaultProps = {
  label: 'Click Me',
}

describe('Button', () => {
  it('renders', () => {
    render(<Button {...defaultProps} />)
  })

  it('calls the onClick function when clicked', () => {
    const mock = jest.fn()
    render(<Button {...defaultProps} onClick={mock} />)
    const button = screen.getByText(defaultProps.label)
    fireEvent.click(button)

    expect(mock).toHaveBeenCalled()
  })
})
