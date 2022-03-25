import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useMemo } from 'react'

import { BarGraphNode, RootNode } from 'src/components'
import { NodeData, ProcessedNode } from 'src/types'

import styles from 'src/styles/Project.module.scss'
import { ProjectContextProvider } from 'src/providers/ProjectContextProvider'
import { ProjectContext } from 'src/contexts'

const EditWrapper: NextPage = () => {
  const router = useRouter()
  const { author, name } = router.query

  return (
    <ProjectContextProvider
      authorName={author?.toString() ?? ''}
      projectName={name?.toString() ?? ''}
    >
      <Edit />
    </ProjectContextProvider>
  )
}

const Edit: React.FC = () => {
  const { project, loading, error, updateNode, updateProject } =
    useContext(ProjectContext)

  const nodesList = useMemo(
    () => Object.values(project?.nodes ?? []),
    [project?.nodes]
  )
  if (loading || !project) return <div>{loading}</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <div className={styles.container}>
        <RootNode
          title={project.name}
          description={project.description}
          updateProject={updateProject}
          editable
        />
      </div>
      <div className={styles.container}>
        {nodesList.map((node: ProcessedNode) => (
          <BarGraphNode
            updateNode={(data: NodeData) => updateNode({ id: node.id, data })}
            key={node.id}
            nodeData={node.data}
            id={node.id}
            editable
          />
        ))}
      </div>
    </>
  )
}

export default EditWrapper
