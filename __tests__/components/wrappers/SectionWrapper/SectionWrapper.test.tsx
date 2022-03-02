import { SectionWrapper } from 'src/components'

import { render } from '@testing-library/react'

const defaultProps = {
  title: 'Test Title',
  description: 'Test Description',
  children: (
    <div>
      <h3>Test</h3>
    </div>
  ),
}

describe('SectionWrapper', () => {
  it('renders', () => {
    render(<SectionWrapper {...defaultProps} />)
  })
})
