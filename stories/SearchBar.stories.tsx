/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { SearchBar } from 'src/components'

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const defaultProps = {
  value: '',
  onChange: () => {},
}

export const SearchBarSample = () => <SearchBar {...defaultProps} />
