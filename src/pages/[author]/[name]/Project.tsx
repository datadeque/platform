import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useMemo } from 'react'

import {
  BarGraphNode,
  PieGraphNode,
  ScatterGraphNode,
  RootNode,
} from 'src/components'
import { PublicProjectContextProvider } from 'src/providers'
import { PublicProjectContext } from 'src/contexts'
import { NodeData, PointNodeData, ProcessedNode } from 'src/types/data/base'

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

  const nodesList = useMemo(
    () => Object.values(project?.nodes ?? []),
    [project?.nodes]
  )
  if (loading || !project) return <></>
  if (error) return <div>{error}</div>

  return (
    <>
      <div className={styles.container}>
        <RootNode title={project.name} description={project.description} />
      </div>
      {nodesList.map((node: ProcessedNode) => {
        switch (node.type) {
          case 'BAR':
            return (
              <div key={node.id} className={styles.container}>
                <BarGraphNode
                  key={node.id}
                  nodeData={node.data as NodeData}
                  id={node.id}
                />
              </div>
            )
          case 'PIE':
            return (
              <div key={node.id} className={styles.container}>
                <PieGraphNode
                  key={node.id}
                  nodeData={node.data as NodeData}
                  id={node.id}
                />
              </div>
            )
          default:
            return (
              <div key={node.id} className={styles.container}>
                <ScatterGraphNode
                  key={node.id}
                  nodeData={node.data as PointNodeData}
                  id={node.id}
                />
              </div>
            )
        }
      })}
    </>
  )
}

export default ProjectWrapper
