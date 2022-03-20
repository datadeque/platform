import { useEffect, useState, ReactNode, useCallback } from 'react'

import { defaultNodeData } from 'src/constants'
import { ProjectContext } from 'src/contexts'
import {
  useProjectQuery,
  useUpdateNodeMutation,
  useUpdateProjectMutation,
} from 'src/graphql/hooks'
import { NodeData, PomelloNode, ProcessedNode, Project } from 'src/types'

interface Props {
  children: ReactNode
  authorName: string
  projectName: string
}

export const ProjectContextProvider: React.FC<Props> = ({
  children,
  authorName,
  projectName,
}: Props) => {
  const {
    data,
    loading: projectQueryLoading,
    error: projectQueryError,
  } = useProjectQuery(authorName, projectName)
  const [project, setProject] = useState<Project | null>(null)
  const [updateProjectMutation] = useUpdateProjectMutation()
  const [updateNodeMutation] = useUpdateNodeMutation()
  const [editLoading, setEditLoading] = useState<boolean>(false)

  useEffect(() => {
    if (data && data.project) {
      const {
        id,
        name,
        description,
        ownerName,
        public: isPublic,
      } = data.project
      const nodes: { [id: string]: ProcessedNode } = {}

      data.project.nodes.forEach((node: PomelloNode) => {
        nodes[node.id] = {
          id: node.id,
          position: node.position,
          type: node.type,
          data: { ...defaultNodeData, ...JSON.parse(node.data) },
        }
      })

      setProject({ id, name, description, ownerName, nodes, public: isPublic })
    }
  }, [data])

  const updateNode = useCallback(
    async ({ id, data }: { id: string; data: NodeData }) => {
      if (!project) return
      setEditLoading(true)
      await updateNodeMutation({
        variables: {
          updateNodeInput: { nodeId: id, data: JSON.stringify(data) },
        },
      })
      setEditLoading(false)
    },
    [project, updateNodeMutation]
  )

  const updateProject = useCallback(
    async ({ name, description }: { name?: string; description?: string }) => {
      if (!project) return
      setEditLoading(true)
      await updateProjectMutation({
        variables: {
          updateProjectInput: { id: project.id, name, description },
        },
      })
      setEditLoading(false)
    },
    [project, updateProjectMutation]
  )

  return (
    <ProjectContext.Provider
      value={{
        editLoading,
        loading: projectQueryLoading,
        updateProject,
        updateNode,
        project,
        error: projectQueryError?.message ?? null,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
