/* eslint-disable @typescript-eslint/no-empty-function */
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
  visibility: 'public',
  actionMenuRoot: {
    onClick: () => {},
    label: 'View/Publish',
  },
  actionMenuLast: {
    onClick: () => {},
    label: 'Delete',
  },
  actionMenuOptions: [
    {
      onClick: () => {},
      label: 'Rename',
    },
    {
      onClick: () => {},
      label: 'Duplicate',
    },
    {
      onClick: () => {},
      label: 'Share',
    },
    {
      onClick: () => {},
      label: 'Rename',
    },
  ],
}

export const ProjectListItemSample = () => <ProjectListItem {...defaultProps} />
