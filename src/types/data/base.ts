export type NodeType = 'BAR' | 'PIE' | 'SCATTER'

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

export interface PointNodeData {
  title: string
  description: string
  legendX: string
  legendY: string
  data: { [label: string]: [number | string, number | string][] }
}

export interface ProcessedNode {
  id: string
  position: string
  data: NodeData | PointNodeData
  type: NodeType
}

export interface EditableGraphData {
  [uuid: string]: [label: string, value: number | string]
}

export interface EditablePointGraphData {
  [uuid: string]: [label: string, value: [number | string, number | string][]]
}
