import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { ProjectListItem } from 'src/components'

export default {
  title: 'Components/ProjectListItem',
  component: ProjectListItem,
} as ComponentMeta<typeof ProjectListItem>

const defaultProps = {
  title: 'My project',
  lastEdited: 'Mar. 10, 2022',
  nodes: 5,
  views: 10,
}

export const ProjectListItemSample = () => <ProjectListItem {...defaultProps} />
