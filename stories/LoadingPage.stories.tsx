import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { LoadingSpinner } from '../src/components'

export default {
  title: 'LoadingPage/Spinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>

export const Spinner = () => <LoadingSpinner />
