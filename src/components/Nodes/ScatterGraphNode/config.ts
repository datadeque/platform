import { ResponsiveScatterPlot as Scatter } from '@nivo/scatterplot'

export const config = {
  margin: { top: 60, right: 140, bottom: 70, left: 90 },
  xScale: { type: 'linear', min: 0, max: 'auto' },
  xFormat: '>-.2f',
  yScale: { type: 'linear', min: 0, max: 'auto' },
  yFormat: '>-.2f',
  axisTop: null,
  axisRight: null,
  colors: { scheme: 'paired' },
} as Partial<Parameters<typeof Scatter>[0]>
