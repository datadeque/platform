import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useMemo } from 'react'

import { BarGraphNode, RootNode } from 'src/components'
import { PublicProjectContextProvider } from 'src/providers'
import { PublicProjectContext } from 'src/contexts'
import { ProcessedNode } from 'src/types/data/base'

import styles from 'src/styles/Project.module.scss'

const ProjectWrapper: NextPage = () => {
  const router = useRouter()
  const { author, name } = router.query

  return (
    <PublicProjectContextProvider
      authorName={author?.toString() ?? ''}
      projectName={name?.toString() ?? ''}
    >
      <Project />
    </PublicProjectContextProvider>
  )
}

const Project: React.FC = () => {
  const { project, loading, error } = useContext(PublicProjectContext)
  console.log(project)

  const nodesList = useMemo(
    () => Object.values(project?.nodes ?? []),
    [project?.nodes]
  )
  if (loading || !project) return <div>LOADING</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <div className={styles.container}>
        <RootNode title={project.name} description={project.description} />
      </div>
      <div className={styles.container}>
        {nodesList.map((node: ProcessedNode) => (
          <BarGraphNode key={node.id} nodeData={node.data} id={node.id} />
        ))}
      </div>
    </>
  )
}

export default ProjectWrapper
