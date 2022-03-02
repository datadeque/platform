import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { Button } from '../src/components'

export default {
  title: 'Components/Buttons',
  component: Button,
} as ComponentMeta<typeof Button>

export const ButtonDefault = () => <Button label="Click Me" />

export const ButtonPrimarySmall = () => <Button label="Click Me" size="sm" />

export const ButtonPrimaryMedium = () => <Button label="Click Me" size="md" />

export const ButtonPrimaryLarge = () => <Button label="Click Me" size="lg" />

export const ButtonPrimaryContained = () => (
  <Button label="Click Me" size="contained" />
)

export const ButtonSecondarySmall = () => (
  <Button label="Click Me" size="sm" variant="secondary" />
)

export const ButtonSecondaryMedium = () => (
  <Button label="Click Me" size="md" variant="secondary" />
)

export const ButtonSecondaryLarge = () => (
  <Button label="Click Me" size="lg" variant="secondary" />
)

export const ButtonSecondaryContained = () => (
  <Button label="Click Me" size="contained" variant="secondary" />
)
