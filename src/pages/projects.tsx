/* eslint-disable @typescript-eslint/no-empty-function */
import type { NextPage } from 'next'
import { Button, ProjectWrapper } from 'src/components'
import styles from 'src/styles/Projects.module.scss'
import { useProjects } from 'src/hooks'

const Home: NextPage = () => {
  const {
    projectList,
    handleAddProject,
  } = useProjects()

  const logo = (
    <a className={styles.logo}></a>
  )

  const sidebar = (
    <div className={styles.sidebar}>
      <input type="text" placeholder="Search"/>
      <p>- of - free projects used</p>
    </div>
  )
  
  const head = (
    <div className={styles.header}>
      <h2>My Projects</h2>
      <Button label="+" onClick={handleAddProject}/>
    </div>
  )

  const labels = (
    <div className={styles.labels}>
      <h3>Project</h3>
      <div className={styles.infoLabels}>
        <h3>Nodes</h3>
        <h3>Visibility</h3>
        <h3>Status</h3>
        <h3>Actions</h3>
      </div>
    </div>
  )

  const emptyMessage = (
    <div>
      <h2 className={styles.defaultEmpty}>No projects yet</h2>
    </div>
  )

  return (
    <div className={styles.main}>
      <div>{logo}</div>
      <div className={styles.layout}>
        {sidebar}
        <div className={styles.content}>
          {head}
          {labels}
          <ProjectWrapper title="Default Sample" lastEdited="Last edited: Mar. 10, 2022" nodes={2} />
          {projectList.length == 0? emptyMessage : projectList}
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default Home