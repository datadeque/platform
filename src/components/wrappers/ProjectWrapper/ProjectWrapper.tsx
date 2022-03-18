import { ReactNode } from 'react'

import styles from './ProjectWrapper.module.scss'
import { Button } from 'src/components/';
import { useProjects } from 'src/hooks'

interface Props {
  title: string
  lastEdited: string
  nodes: number
}

export const ProjectWrapper: React.FC<Props> = ({
  title,
  lastEdited,
  nodes,
}: Props) => {
  const {
    published,
    visibility,
    handleDeleteProject,
    toggleVisibility,
    handlePublishProject,
  } = useProjects()

  const header = (
    <div className={styles.header}>
      <h2>{title}</h2>
      <h3>{lastEdited}</h3>
    </div>
  )

  const projectInfo = (
    <div className={styles.projectInfo}>
      <div className={styles.editButton}><Button label="Edit" /></div>
      <p>{nodes}</p>
      {visibility === "public"? <Button label="Public" onClick={toggleVisibility}/> : <Button label="Private" onClick={toggleVisibility}/>}
      {published? <Button label="Published" /> : <Button label="Publish" onClick={handlePublishProject}/>}
      <Button label="Delete" variant="secondary" onClick={handleDeleteProject}/>
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
