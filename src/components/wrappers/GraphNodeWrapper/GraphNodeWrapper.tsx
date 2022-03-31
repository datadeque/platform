/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useContext } from 'react'
import {
  EditableDescription,
  EditableHeading,
  IconButton,
} from 'src/components'
import { remove } from 'src/components/IconButton/icons'
import styles from './GraphNodeWrapper.module.scss'
import { ProjectContext, ModalContext } from 'src/contexts'

interface Props {
  title: string
  id: string
  description: string
  children: React.ReactNode
  editable?: boolean
  onTitleSave?: (title: string) => void
  onDescriptionSave?: (title: string) => void
}

export const GraphNodeWrapper: React.FC<Props> = ({
  title,
  id,
  description,
  children,
  editable = false,
  onTitleSave,
  onDescriptionSave,
}: Props) => {
  const [titleText, setTitleText] = useState(title)
  const [descriptionText, setDescriptionText] = useState(description)
  const { deleteNode } = useContext(ProjectContext)
  const {
    useConfirmationModalState: [, setConfirmationModalState],
  } = useContext(ModalContext)

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
      {editable ? (
        <div className={styles.delete}>
          <IconButton
            onClick={() => {
              setConfirmationModalState({
                title: `Are you sure you want to delete ${titleText}?`,
                content: 'This action will permanently delete this node.',
                onConfirm: () => {
                  deleteNode(id)
                },
              })
            }}
          >
            {remove}
          </IconButton>
        </div>
      ) : null}
    </div>
  )
}
