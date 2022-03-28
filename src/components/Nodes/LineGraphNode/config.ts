/* eslint-disable import/named */
import { Dimensions } from '@nivo/core'
import { LineSvgProps } from '@nivo/line'

export const config = {
  margin: { top: 50, right: 110, bottom: 50, left: 60 },
  xScale: { type: 'linear' },
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: false,
    reverse: false,
  },
  yFormat: ' >-.2f',
  axisTop: null,
  axisRight: null,
  pointSize: 10,
  pointColor: { theme: 'background' },
  pointBorderWidth: 2,
  pointBorderColor: { from: 'serieColor' },
  pointLabelYOffset: -12,
  useMesh: true,
  colors: { scheme: 'paired' },
} as Partial<LineSvgProps & Dimensions>
