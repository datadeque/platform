import { NodeData, PointNodeData } from 'src/types/data'

export const defaultNodeData: NodeData = {
  title: 'Default Title',
  description: 'Default Description',
  legend: 'Default Legend',
  data: { default1: 100, default2: 200 },
}

export const defaultPointNodeData: PointNodeData = {
  title: 'Default Title',
  description: 'Default Description',
  legendX: 'Default X',
  legendY: 'Default Y',
  data: {
    group1: [
      [100, 130],
      [200, 150],
    ],
    group2: [
      [50, 60],
      [100, 100],
      [150, 150],
    ],
  },
}
/*group1: [
      [100, 130],
      [200, 150],
    ],*/
