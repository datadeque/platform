import { ResponsiveBar as Bar } from '@nivo/bar'

export const config = {
  indexBy: 'label',
  margin: { top: 50, right: 50, bottom: 50, left: 60 },
  padding: 0.3,
  layout: 'horizontal',
  colors: { scheme: 'green_blue' },
  colorBy: 'indexValue',
  axisRight: null,
  axisBottom: null,
  enableGridX: false,
  enableGridY: false,
  borderWidth: 0,
  borderRadius: 5,
  labelSkipWidth: 12,
  labelSkipHeight: 12,
  labelTextColor: {
    from: 'color',
    modifiers: [['darker', '2']],
  },
} as unknown as Partial<Parameters<typeof Bar>[0]>
