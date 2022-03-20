import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { ErrorModal } from '../src/components/'

export default {
  title: 'Modals/ErrorModal',
  component: ErrorModal,
} as ComponentMeta<typeof ErrorModal>

export const ErrorModalDefault = () => <ErrorModal />
