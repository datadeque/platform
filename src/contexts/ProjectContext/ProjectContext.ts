import { createContext } from 'react'
import { NodeData, Project } from 'src/types'

interface IProjectContext {
  project: Project | null
  loading: boolean
  editLoading: boolean
  error: string | null
  updateProject: ({
    name,
    description,
  }: {
    name?: string
    description?: string
  }) => void
  updateNode: ({ id, data }: { id: string; data: NodeData }) => void
}

const fn = () => {
  throw new Error('ProjectContext poorly provided')
}

export const ProjectContext = createContext<IProjectContext>({
  project: null,
  updateProject: fn,
  loading: true,
  editLoading: false,
  error: null,
  updateNode: fn,
})
