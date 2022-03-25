import { ResponsivePie as Pie } from '@nivo/pie'

export const config = {
  margin: { top: 10, right: 80, bottom: 70, left: 80 },
  innerRadius: 0.5,
  padAngle: 0.7,
  cornerRadius: 3,
  activeOuterRadiusOffset: 8,
  borderWidth: 1,
  borderColor: {
    from: 'color',
    modifiers: [['darker', 0.2]],
  },
  arcLinkLabel: 'id',
  arcLinkLabelsSkipAngle: 10,
  arcLinkLabelsThickness: 2,
  arcLinkLabelsColor: { from: 'color' },
  arcLabelsSkipAngle: 10,
  arcLabelsTextColor: {
    from: 'color',
    modifiers: [['darker', 2]],
  },
  colors: { scheme: 'green_blue' },
  legends: [
    {
      anchor: 'bottom',
      direction: 'row',
      justify: false,
      translateX: 0,
      translateY: 56,
      itemsSpacing: 0,
      itemWidth: 100,
      itemHeight: 18,
      itemDirection: 'left-to-right',
      itemOpacity: 1,
      symbolSize: 18,
      symbolShape: 'circle',
    },
  ],
} as Partial<Parameters<typeof Pie>[0]>
