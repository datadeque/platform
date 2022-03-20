import { ReactNode, useEffect, useState } from 'react'

import { defaultNodeData } from 'src/constants'
import { PublicProjectContext } from 'src/contexts'
import { usePublicProjectQuery } from 'src/graphql/hooks'
import { PomelloNode, ProcessedNode, Project } from 'src/types'

interface Props {
  children: ReactNode
  authorName: string
  projectName: string
}

export const PublicProjectContextProvider: React.FC<Props> = ({
  children,
  authorName,
  projectName,
}: Props) => {
  const {
    loading: publicProjectQueryLoading,
    error: publicProjectQueryError,
    data,
  } = usePublicProjectQuery(authorName, projectName)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    if (data && data.publicProject) {
      const {
        id,
        name,
        description,
        ownerName,
        public: isPublic,
      } = data.publicProject
      const nodes: { [id: string]: ProcessedNode } = {}

      data.publicProject.nodes.forEach((node: PomelloNode) => {
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

  return (
    <PublicProjectContext.Provider
      value={{
        loading: publicProjectQueryLoading,
        project,
        error: publicProjectQueryError?.message ?? null,
      }}
    >
      {children}
    </PublicProjectContext.Provider>
  )
}
