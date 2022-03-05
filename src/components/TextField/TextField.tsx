import className from 'classnames'

import styles from './TextField.module.scss'

interface Props {
  type?: string
  label: string
  variant?: 'outlined' | 'standard'
  defaultValue?: string
  error?: string
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField: React.FC<Props> = (props: Props) => {
  const {
    type = 'text',
    label,
    variant = 'standard',
    defaultValue = '',
    error,
    value,
    onChange,
  } = props
  return (
    <fieldset
      className={className(styles.fieldset, styles[variant], {
        [styles[`${variant}-error`]]: error,
      })}
    >
      <legend>{error || label}</legend>
      <input
        value={value}
        type={type}
        placeholder={defaultValue}
        onChange={onChange}
      />
    </fieldset>
  )
}
