import { useRouter } from 'next/router'
import { ReactNode, useContext, useEffect, useState } from 'react'

import { defaultNodeData, defaultPointNodeData } from 'src/constants'
import { ModalContext, PublicProjectContext } from 'src/contexts'
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
  const { push } = useRouter()
  const {
    loading: publicProjectQueryLoading,
    error: publicProjectQueryError,
    data,
  } = usePublicProjectQuery(authorName, projectName)
  const [project, setProject] = useState<Project | null>(null)

  const { useErrorModalState } = useContext(ModalContext)
  const [, setErrorModalState] = useErrorModalState
  const { useLoadingModalState } = useContext(ModalContext)
  const [, setLoadingModalState] = useLoadingModalState

  useEffect(() => {
    if (publicProjectQueryError)
      setErrorModalState({
        title: publicProjectQueryError.message,
        onDismiss: () => push('/'),
      })
  }, [publicProjectQueryError, push, setErrorModalState])

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

  useEffect(() => {
    setLoadingModalState(publicProjectQueryLoading)
  }, [publicProjectQueryLoading, setLoadingModalState])

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
