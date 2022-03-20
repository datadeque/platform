import { ProcessedNode } from 'src/types'

export interface BaseProject {
  id: number
  name: string
  ownerName: string
  public: boolean
  description: string
}

export interface Project extends BaseProject {
  nodes: { [id: string]: ProcessedNode }
}
