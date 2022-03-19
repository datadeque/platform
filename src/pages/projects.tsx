/* eslint-disable @typescript-eslint/no-empty-function */
import type { NextPage } from 'next'
import { Button, ProjectWrapper, Header, DropdownOption } from 'src/components'
import styles from 'src/styles/Projects.module.scss'
import { useProjects } from 'src/hooks'
import { searchIcon, downChevron } from 'src/components/icons'


const Home: NextPage = () => {
  const {
    projectList,
    handleAddProject,
    sortMenu,
    toggleSortMenu,
  } = useProjects()

  const sidebar = (
    <div className={styles.sidebar}>
      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>{searchIcon}</div>
        <input type="text" placeholder="Search your projects"/>
      </div>
      <div className={styles.stats}>
        <h3>Stats</h3>
        <p>- of - free projects used</p>
        <p>- total project views</p>
        <p>- projects published</p>
      </div>
    </div>
  )
  
  const sortDropdown = (
    <div className={styles.sortDropdown}>
      <DropdownOption label="Last edited" variant="lastEdited"/>
      <DropdownOption label="Date created" variant="dateCreated"/>
      <DropdownOption label="Alphabetical" />
    </div>
  )

  const head = (
    <div className={styles.header}>
      <h2>My projects</h2>
      <div className={styles.subheader}>
        <Button label="+ New project" onClick={handleAddProject}/>
        <div className={styles.sortMenu} onClick={toggleSortMenu}>
          Sort by
          {downChevron}
        </div>
        {sortMenu? sortDropdown : null}
      </div>
    </div>
  )

  const labels = (
    <div className={styles.labels}>
      <h3>Project</h3>
      <div className={styles.infoLabels}>
        <h3>Nodes</h3>
        <h3>Visibility</h3>
        <h3>Views</h3>
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
      <Header/>
      <div className={styles.layout}>
        {sidebar}
        <div className={styles.content}>
          {head}
          {labels}
          {projectList.length == 0? emptyMessage : projectList}
        </div>
      </div>
    </div>
  )
}

export default Home