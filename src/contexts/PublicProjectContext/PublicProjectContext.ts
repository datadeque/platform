import { createContext } from 'react'

import { Project } from 'src/types'

interface IPublicProjectContext {
  project: Project | null
  loading: boolean
  error: string | null
}

export const PublicProjectContext = createContext<IPublicProjectContext>({
  project: null,
  loading: true,
  error: null,
})
