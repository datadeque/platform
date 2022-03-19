import { ReactNode } from 'react'

import styles from './ProjectWrapper.module.scss'
import { Button, DropdownOption } from 'src/components/';
import { useProjects } from 'src/hooks'
import { bubbleMenuIcon } from 'src/components/icons'

interface Props {
  title: string
  lastEdited: string
  nodes: number
  views: number
}

export const ProjectWrapper: React.FC<Props> = ({
  title,
  lastEdited,
  nodes,
  views,
}: Props) => {
  const {
    visibility,
    handleDeleteProject,
    actionMenu,
    toggleActionMenu,
  } = useProjects()

  const header = (
    <div className={styles.header}>
      <h2>{title}</h2>
      <h3>{lastEdited}</h3>
    </div>
  )

  const actionMenuDropdown = (
    <div className={styles.menuDropdown}>
      <DropdownOption label="View/Publish"/>
      <DropdownOption label="Rename"/>
      <DropdownOption label="Duplicate"/>
      <DropdownOption label="Share"/>
      <DropdownOption label="Delete" variant="delete"/>
    </div>
  )

  const projectInfo = (
    <div className={styles.projectInfo}>
      <div className={styles.editButton}><Button label="Edit" /></div>
      <p>{nodes}</p>
      {visibility === "public"? <p>Public</p> : <p>Private</p>}
      <p>{views}</p>
      <div className={styles.actionMenu} onClick={toggleActionMenu}>
        {bubbleMenuIcon}
      </div>
        {actionMenu? actionMenuDropdown : null}
    </div>
  )

  const handleOpenProject = () => {
    console.log("clicked project")
  }

  return (
    <div className={styles.container} onClick={handleOpenProject}>
      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <div className={styles.picture} />
          {header}
        </div>
        {projectInfo}
      </div>
    </div>
  )
}
