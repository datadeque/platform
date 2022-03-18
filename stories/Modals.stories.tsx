import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { AddProjectModal } from 'src/components'

export default {
  title: 'Modals/AddProjectModal',
  component: AddProjectModal,
} as ComponentMeta<typeof AddProjectModal>

export const AddProjectModal = () => (
  <AddProjectModal description="Description" />
)



