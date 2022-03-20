import styles from './IconButton.module.scss'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: VoidFunction
}

export const IconButton: React.FC<Props> = (props: Props) => {
  const { onClick, children } = props

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
