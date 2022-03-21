import { useRouter } from 'next/router'
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ModalContext, ProjectsContext } from 'src/contexts'
import { useProjectsQuery, useRemoveProjectMutation } from 'src/graphql/hooks'
import { BaseProject } from 'src/types'

interface Props {
  children: ReactNode
}

export const ProjectsContextProvider: React.FC<Props> = ({
  children,
}: Props) => {
  const { push } = useRouter()
  const { data, loading, error, refetch } = useProjectsQuery()
  const [projects, setProjects] = useState<BaseProject[] | null>(null)
  const [removeProject] = useRemoveProjectMutation()
  const useQueryState = useState('')
  const { useErrorModalState } = useContext(ModalContext)
  const [, setErrorModalState] = useErrorModalState

  useEffect(() => {
    if (error)
      setErrorModalState({ title: error.message, onDismiss: () => push('/') })
  }, [error, push, setErrorModalState])

  useEffect(() => {
    if (data && data.projects) {
      setProjects(data.projects)
    }
  }, [data])

  const deleteProject = useCallback(
    async (id: number) => {
      await removeProject({ variables: { id } })
      refetch()
    },
    [refetch, removeProject]
  )

  const filteredProjects = useMemo(
    () =>
      projects
        ? projects.filter(
            (project: BaseProject) =>
              project.name.indexOf(useQueryState[0]) !== -1
          )
        : null,
    [projects, useQueryState]
  )

  return (
    <ProjectsContext.Provider
      value={{
        projects: filteredProjects,
        useQueryState,
        loading,
        error: error?.message ?? null,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
