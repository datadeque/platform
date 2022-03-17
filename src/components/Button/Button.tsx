import className from 'classnames'

import styles from './Button.module.scss'

interface Props {
  size?: 'lg' | 'md' | 'sm' | 'contained'
  onClick?: VoidFunction
  variant?: 'primary' | 'secondary'
  label: string
  loading?: true | false
  disabled?: true | false
}

export const Button: React.FC<Props> = (props: Props) => {
  const {
    size = 'md',
    onClick,
    variant = 'primary',
    label,
    loading = false,
    disabled = false,
  } = props

  return (
    <button
      className={className(styles.button, styles[size], styles[variant])}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <div className={styles.loadingicon}>
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        label
      )}
    </button>
  )
}
