import { useEffect, useState, ReactNode, useCallback } from 'react'

import { defaultNodeData, defaultPointNodeData } from 'src/constants'
import { ProjectContext } from 'src/contexts'
import {
  useProjectQuery,
  useUpdateNodeMutation,
  useUpdateProjectMutation,
  useRemoveNodeMutation,
} from 'src/graphql/hooks'
import {
  NodeData,
  PointNodeData,
  PomelloNode,
  ProcessedNode,
  Project,
} from 'src/types'

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
  const [removeNodeInput] = useRemoveNodeMutation()
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
        const defaultData =
          node.type == 'BAR' || node.type == 'PIE'
            ? defaultNodeData
            : defaultPointNodeData
        nodes[node.id] = {
          id: node.id,
          position: node.position,
          type: node.type,
          data: { ...defaultData, ...JSON.parse(node.data) },
        }
      })

      setProject({ id, name, description, ownerName, nodes, public: isPublic })
    }
  }, [data])

  const updateNode = useCallback(
    async ({ id, data }: { id: string; data: NodeData | PointNodeData }) => {
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

  const removeNode = useCallback(
    async (id: string) => {
      await removeNodeInput({ variables: { id } })
    },
    [removeNodeInput]
  )

  const updateProject = useCallback(
    async ({
      name,
      description,
      public: isPublic,
    }: {
      name?: string
      description?: string
      public?: boolean
    }) => {
      if (!project) return
      setEditLoading(true)
      await updateProjectMutation({
        variables: {
          updateProjectInput: {
            id: project.id,
            name,
            description,
            public: isPublic,
          },
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
        removeNode,
        project,
        error: projectQueryError?.message ?? null,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
