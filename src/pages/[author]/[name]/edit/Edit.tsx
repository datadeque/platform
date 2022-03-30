import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useMemo } from 'react'

import {
  BarGraphNode,
  PieGraphNode,
  ScatterGraphNode,
  LineGraphNode,
  RootNode,
  Button,
} from 'src/components'
import { NodeData, PointNodeData, ProcessedNode } from 'src/types'

import styles from 'src/styles/Project.module.scss'
import editStyles from './Edit.module.scss'
import { ProjectContextProvider } from 'src/providers/ProjectContextProvider'
import { ProjectContext, ModalContext } from 'src/contexts'

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
  const {
    useNewNodeModalState: [, setNewNodeModalState],
  } = useContext(ModalContext)

  const nodesList = useMemo(
    () => Object.values(project?.nodes ?? []),
    [project?.nodes]
  )
  if (loading || !project) return <></>
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
        <div className={editStyles.container}>
          <Button
            label="+ Add Graph"
            onClick={() => setNewNodeModalState(true)}
          />
        </div>
      </div>
      {nodesList.map((node: ProcessedNode) => {
        switch (node.type) {
          case 'BAR':
            return (
              <div key={node.id} className={styles.container}>
                <BarGraphNode
                  updateNode={(data: NodeData) =>
                    updateNode({ id: node.id, data })
                  }
                  key={node.id}
                  nodeData={node.data as NodeData}
                  id={node.id}
                  editable
                />
              </div>
            )
          case 'PIE':
            return (
              <div key={node.id} className={styles.container}>
                <PieGraphNode
                  updateNode={(data: NodeData) =>
                    updateNode({ id: node.id, data })
                  }
                  key={node.id}
                  nodeData={node.data as NodeData}
                  id={node.id}
                  editable
                />
              </div>
            )
          case 'SCATTER':
            return (
              <div key={node.id} className={styles.container}>
                <ScatterGraphNode
                  updateNode={(data: PointNodeData) =>
                    updateNode({ id: node.id, data })
                  }
                  key={node.id}
                  nodeData={node.data as PointNodeData}
                  id={node.id}
                  editable
                />
              </div>
            )
          default:
            return (
              <div key={node.id} className={styles.container}>
                <LineGraphNode
                  updateNode={(data: PointNodeData) =>
                    updateNode({ id: node.id, data })
                  }
                  key={node.id}
                  nodeData={node.data as PointNodeData}
                  id={node.id}
                  editable
                />
              </div>
            )
        }
      })}
    </>
  )
}

export default EditWrapper
