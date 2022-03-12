/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Header } from 'src/components'

import { render } from '@testing-library/react'

import * as nextRouter from 'next/router'

const useRouter = jest.spyOn(nextRouter, 'useRouter')

// @ts-ignore
useRouter.mockImplementation(() => ({ pathname: 'test' }))

describe('Header', () => {
  it('renders', () => {
    render(<Header />)
  })
})
