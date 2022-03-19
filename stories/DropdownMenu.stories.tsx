/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { ComponentMeta } from '@storybook/react'

import { DropdownMenu } from '../src/components'

export default {
  title: 'DropdownMenu',
  component: DropdownMenu,
} as ComponentMeta<typeof DropdownMenu>

export const DropdownMenuDefault = () => (
  <div style={{ width: 100, height: 50 }}>
    <DropdownMenu
      main={'TEST'}
      options={[
        {
          onClick: () => {},
          label: 'Option 1',
        },
        {
          onClick: () => {},
          label: 'Option 2',
        },
      ]}
      rootOption={{
        onClick: () => {},
        label: 'Root Option',
      }}
      lastOption={{
        onClick: () => {},
        label: (
          <>
            <p>Final </p>
            <svg
              width="14"
              height="14"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L19.9996 11.25C20.4138 11.25 20.7496 11.5858 20.7496 12C20.7496 12.4142 20.4138 12.75 19.9996 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12ZM6.53307 19C6.53307 18.5858 6.86886 18.25 7.28307 18.25L20 18.25C20.4142 18.25 20.75 18.5858 20.75 19C20.75 19.4142 20.4142 19.75 20 19.75L7.28307 19.75C6.86886 19.75 6.53307 19.4142 6.53307 19ZM12.2219 5C12.2219 4.58579 12.5577 4.25 12.9719 4.25L20 4.25C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75L12.9719 5.75C12.5577 5.75 12.2219 5.41421 12.2219 5Z"
              />
            </svg>
          </>
        ),
      }}
    />
  </div>
)
