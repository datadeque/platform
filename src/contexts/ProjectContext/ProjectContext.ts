import { createContext } from 'react'
import { NodeData, PointNodeData, Project } from 'src/types'

interface IProjectContext {
  project: Project | null
  loading: boolean
  editLoading: boolean
  error: string | null
  updateProject: ({
    name,
    description,
    public: isPublic,
  }: {
    name?: string
    description?: string
    public?: boolean
  }) => void
  updateNode: ({
    id,
    data,
  }: {
    id: string
    data: NodeData | PointNodeData
  }) => void
  deleteNode: (id: string) => void
  refetch: VoidFunction
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
  deleteNode: fn,
  refetch: fn,
})
