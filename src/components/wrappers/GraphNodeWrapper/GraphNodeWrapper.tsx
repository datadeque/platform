import { useState } from 'react'
import { EditableDescription, EditableHeading } from 'src/components'
import styles from './GraphNodeWrapper.module.scss'

interface Props {
  title: string
  description: string
  children: React.ReactNode
  editable?: boolean
}

export const GraphNodeWrapper: React.FC<Props> = ({
  title,
  description,
  children,
  editable = false,
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
        />
      ) : (
        <h1>{titleText}</h1>
      )}
      {editable ? (
        <EditableDescription
          value={descriptionText}
          className={styles.editable}
          onChange={(e) => setDescriptionText(e.target.value)}
        />
      ) : (
        <p>{description}</p>
      )}
      {children}
    </div>
  )
}
