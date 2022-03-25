export type NodeType = 'BAR'

export interface PomelloNode {
  id: string
  position: string
  data: string
  type: NodeType
}

export interface NodeData {
  title: string
  description: string
  legend: string
  data: { [key: string]: number | string }
}

export interface ProcessedNode {
  id: string
  position: string
  data: NodeData
  type: NodeType
}

export interface EditableGraphData {
  [uuid: string]: [key: string, value: number | string]
}
