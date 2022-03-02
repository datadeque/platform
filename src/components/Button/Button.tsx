import className from 'classnames'

import styles from './Button.module.scss'

interface Props {
  size?: 'lg' | 'md' | 'sm' | 'contained'
  onClick?: VoidFunction
  variant?: 'primary' | 'secondary'
  label: string
}

export const Button: React.FC<Props> = (props: Props) => {
  const { size = 'md', onClick, variant = 'primary', label } = props

  return (
    <button
      className={className(styles.button, styles[size], styles[variant])}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
