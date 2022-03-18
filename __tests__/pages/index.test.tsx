/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react'

import Home from 'src/pages/index'

import * as nextRouter from 'next/router'

HTMLCanvasElement.prototype.getContext = jest.fn()

const useRouter = jest.spyOn(nextRouter, 'useRouter')

const push = jest.fn()
// @ts-ignore
useRouter.mockImplementation(() => ({ pathname: 'test', push }))

describe('Home', () => {
  it('renders', () => {
    render(<Home />)
  })
})
