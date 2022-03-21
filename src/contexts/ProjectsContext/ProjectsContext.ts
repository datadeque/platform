import { createContext } from 'react'

import { BaseProject } from 'src/types'

interface IPublicProjectsContext {
  projects: BaseProject[] | null
  refetch: VoidFunction
  deleteProject: (id: number) => void
  useQueryState: [string, (arg0: string) => void]
  loading: boolean
  error: string | null
}

const fn = () => {
  throw new Error('poorly provided ProjectsContext')
}

export const ProjectsContext = createContext<IPublicProjectsContext>({
  projects: null,
  useQueryState: ['', fn],
  deleteProject: fn,
  loading: false,
  error: null,
  refetch: fn,
})
