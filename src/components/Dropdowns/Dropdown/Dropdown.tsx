import className from 'classnames'

import styles from './Dropdown.module.scss'

interface Props {
  type?: string
  children?: string
  onClick?: VoidFunction
}

export const Dropdown: React.FC<Props> = (props: Props) => {
  const {
    type = 'text',
    children,
    onClick,
  } = props
  return (
    <div className={styles.dropdown} onClick={onClick}>
      <div className={styles.children}>{children}</div>
    </div>
  )
}
