import className from 'classnames'

import styles from './DropdownOption.module.scss'
import { editIcon, clockIcon, trashIcon } from 'src/components/icons'

interface Props {
  label: string
  onClick?: VoidFunction
  variant?: "delete" | "lastEdited" | "dateCreated"
  icon?: string
}

export const DropdownOption: React.FC<Props> = (props: Props) => {
  const {
    label,
    onClick,
    variant,
    icon,
  } = props

  const normalOption = (
    <div className={styles.normal}>
      {label}
    </div>
  )

  const lastEditedOption = (
    <div className={styles.icon}>
      {editIcon}
      {label}
    </div>
  )

  const dateCreatedOption = (
    <div className={styles.icon}>
      {clockIcon}
      {label}
    </div>
  )

  const deleteOption = (
    <div className={styles.delete}>
      {label}
      {trashIcon}
    </div>
  )

  return (
    <div className={styles.dropdownOption} onClick={onClick}>
      {variant == "delete"? deleteOption :
       variant == "lastEdited"? lastEditedOption :
       variant == "dateCreated"? dateCreatedOption:
       normalOption}
    </div>
  )
}
