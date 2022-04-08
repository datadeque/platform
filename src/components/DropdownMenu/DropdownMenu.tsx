/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'

import styles from './DropdownMenu.module.scss'

interface Props {
  main: string | ReactNode
  options: {
    onClick: VoidFunction
    label: string | ReactNode
  }[]
  rootOption?: {
    onClick: VoidFunction
    label: string | ReactNode
  }
  lastOption?: {
    onClick: VoidFunction
    label: string | ReactNode
  }
}

export const DropdownMenu: React.FC<Props> = ({
  main,
  rootOption,
  options,
  lastOption,
}: Props) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useEffect(() => {
    const onClick = () => {
      setShowMenu(false)
    }

    document.addEventListener('mousedown', onClick)

    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.interface} onClick={() => setShowMenu(!showMenu)}>
        {main}
      </div>
      <div
        className={classNames(styles.menu, {
          [styles.active]: showMenu,
        })}
      >
        {rootOption && (
          <div className={styles.root} onClick={rootOption.onClick}>
            {rootOption.label}
          </div>
        )}
        {options.map(({ label, onClick }, index) => (
          <div onClick={onClick} key={`dropdown-${index}`}>
            {label}
          </div>
        ))}
        {lastOption && (
          <div className={styles.final} onClick={lastOption.onClick}>
            {lastOption.label}
          </div>
        )}
      </div>
    </div>
  )
}
