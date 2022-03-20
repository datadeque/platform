import { ProcessedNode } from 'src/types'

export interface Project {
  id: string
  name: string
  ownerName: string
  public: boolean
  description: string
  nodes: { [id: string]: ProcessedNode }
}
