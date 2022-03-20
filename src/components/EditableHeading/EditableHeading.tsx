/* eslint-disable jsx-a11y/no-autofocus */
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import { IconButton } from 'src/components'
import { edit, save } from 'src/components/IconButton/icons'

import styles from './EditableHeading.module.scss'

interface Props {
  value: string
  className: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSave?: VoidFunction
}

export const EditableHeading: React.FC<Props> = (props: Props) => {
  const { value, className, onChange, onSave } = props
  const [editText, setEditText] = useState(false)

  return (
    <div
      className={classNames(className, styles.container, {
        [styles.active]: editText,
      })}
    >
      {editText ? (
        <>
          <input value={value} onChange={onChange} autoFocus />
          <IconButton
            onClick={() => {
              setEditText(false)
              onSave && onSave()
            }}
          >
            {save}
          </IconButton>
        </>
      ) : (
        <>
          <h1>{value}</h1>
          <IconButton onClick={() => setEditText(true)}>{edit}</IconButton>
        </>
      )}
    </div>
  )
}
