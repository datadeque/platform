/* eslint-disable @typescript-eslint/no-empty-function */
import type { NextPage } from 'next'
import { Button, ProjectWrapper } from 'src/components'
import styles from 'src/styles/Projects.module.scss'

const Home: NextPage = () => {
  const logo = (
    <a className={styles.logo}></a>
  )
  
  const head = (
    <div className={styles.header}>
      <h2>Your Projects</h2>
      <Button label="+" />
    </div>
  )

  return (
    <div className={styles.main}>
      <div>{logo}</div>
      <div className={styles.layout}>
        {head}
        <ProjectWrapper title="My Project" description="My Description" lastEdited="Mar. 10, 2022" published={true} visibility="public" />
      </div>
    </div>
  )
}

export default Home