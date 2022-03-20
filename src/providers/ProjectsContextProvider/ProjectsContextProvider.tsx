import { ReactNode, useCallback, useEffect, useState } from 'react'
import { ProjectsContext } from 'src/contexts'
import { useProjectsQuery, useRemoveProjectMutation } from 'src/graphql/hooks'

interface Props {
  children: ReactNode
}

export const ProjectsContextProvider: React.FC<Props> = ({
  children,
}: Props) => {
  const { data, loading, error, refetch } = useProjectsQuery()
  const [projects, setProjects] = useState(null)
  const [removeProject] = useRemoveProjectMutation()
  const useQueryState = useState('')

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

  return (
    <ProjectsContext.Provider
      value={{
        projects,
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
