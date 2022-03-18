import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { SectionWrapper } from '../src/components'

export default {
  title: 'Wrappers/SectionWrapper',
  component: SectionWrapper,
} as ComponentMeta<typeof SectionWrapper>

export const SectionWrapperWithoutChildren = () => (
  <SectionWrapper title="Title" description="Description, hello" />
)

// export const ProjectWrapperPublished = () => (
//   <ProjectWrapper title="Title" description="Description, hello" lastEdited="Mar. 10, 2022" published={true} visibility="public"/>
// )



