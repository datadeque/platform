/* eslint-disable import/named */
import { Dimensions } from '@nivo/core'
import { LineSvgProps } from '@nivo/line'
import { LegendProps } from '@nivo/legends'

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

export const legendConfig = {
  anchor: 'bottom-right',
  direction: 'column',
  justify: false,
  translateX: 100,
  translateY: 0,
  itemsSpacing: 0,
  itemDirection: 'left-to-right',
  itemWidth: 80,
  itemHeight: 20,
  itemOpacity: 0.75,
  symbolSize: 12,
  symbolShape: 'circle',
  symbolBorderColor: 'rgba(0, 0, 0, .5)',
  effects: [
    {
      on: 'hover',
      style: {
        itemBackground: 'rgba(0, 0, 0, .03)',
        itemOpacity: 1,
      },
    },
  ],
} as LegendProps
