import { useState } from 'react'
import { EditableDescription, EditableHeading } from 'src/components'
import styles from './GraphNodeWrapper.module.scss'

interface Props {
  title: string
  description: string
  children: React.ReactNode
  editable?: boolean
  onTitleSave?: (title: string) => void
  onDescriptionSave?: (title: string) => void
}

export const GraphNodeWrapper: React.FC<Props> = ({
  title,
  description,
  children,
  editable = false,
  onTitleSave,
  onDescriptionSave,
}: Props) => {
  const [titleText, setTitleText] = useState(title)
  const [descriptionText, setDescriptionText] = useState(description)
  return (
    <div className={styles.container}>
      {editable ? (
        <EditableHeading
          value={titleText}
          className={styles.editable}
          onChange={(e) => setTitleText(e.target.value)}
          onSave={() => onTitleSave && onTitleSave(titleText)}
        />
      ) : (
        <h1>{title}</h1>
      )}
      {editable ? (
        <EditableDescription
          value={descriptionText}
          className={styles.editable}
          onChange={(e) => setDescriptionText(e.target.value)}
          onSave={() => onDescriptionSave && onDescriptionSave(descriptionText)}
        />
      ) : (
        <p>{description}</p>
      )}
      {children}
    </div>
  )
}
