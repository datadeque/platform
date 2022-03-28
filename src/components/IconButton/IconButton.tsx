import styles from './IconButton.module.scss'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: VoidFunction
  disabled?: true | false
  toolTip?: string
}

export const IconButton: React.FC<Props> = (props: Props) => {
  const { onClick, children, disabled = false, toolTip } = props

  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      title={disabled ? toolTip : ''}
    >
      {children}
    </button>
  )
}
