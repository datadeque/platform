import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ResponsiveScatterPlot as Scatter } from '@nivo/scatterplot'
import { v4 as uuid } from 'uuid'

import { ThemeContext } from 'src/contexts'
import {
  IconButton,
  GraphNodeWrapper,
  EditPointGraphPanel,
} from 'src/components'
import { lightTheme, darkTheme } from 'src/components/Nodes/theme'
import { config } from './config'
import styles from 'src/components/Nodes/Nodes.module.scss'
import { EditablePointGraphData, PointNodeData } from 'src/types/data/base'
import { edit, save } from 'src/components/IconButton/icons'
import classNames from 'classnames'

interface Props {
  nodeData: PointNodeData
  editable?: boolean
  id: string
  updateNode?: (data: PointNodeData) => void
}

export const ScatterGraphNode: React.FC<Props> = (props: Props) => {
  const { theme } = useContext(ThemeContext)
  const { nodeData, editable = false, updateNode } = props
  const { title, description, data, legendX, legendY } = nodeData

  const [editableLegendX, setEditableLegendX] = useState(legendX)
  const [editableLegendY, setEditableLegendY] = useState(legendY)
  const [legendVisible, setLegendVisible] = useState(true)
  const [editActive, setEditActive] = useState(false)
  const [nullDataPoint, setNullDataPoint] = useState(false)

  const [graphData, setGraphData] = useState<EditablePointGraphData>({})

  const onTitleSave = useCallback(
    (title: string) => {
      if (updateNode) updateNode({ ...nodeData, title })
    },
    [nodeData, updateNode]
  )

  const onDescriptionSave = useCallback(
    (description: string) => {
      if (updateNode) updateNode({ ...nodeData, description })
    },
    [nodeData, updateNode]
  )

  useEffect(() => {
    setGraphData(
      Object.fromEntries(
        Object.entries(nodeData.data).map((entry) => [uuid(), entry])
      )
    )
  }, [nodeData])

  useEffect(() => {
    if (editable)
      for (const [, values] of Object.entries(Object.values(graphData))) {
        for (const value of values[1]) {
          if (value[0] == '' || value[1] == '') {
            setNullDataPoint(true)
            return
          }
        }
      }
    setNullDataPoint(false)
  }, [editable, graphData])

  const handleLegendXChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditableLegendX(e.target.value)
    },
    []
  )

  const handleLegendYChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditableLegendY(e.target.value)
    },
    []
  )

  const handleLegendVisibleChange = useCallback(() => {
    setLegendVisible(!legendVisible)
  }, [legendVisible])

  return (
    <GraphNodeWrapper
      title={title}
      onTitleSave={onTitleSave}
      onDescriptionSave={onDescriptionSave}
      description={description}
      editable={editable}
    >
      <div className={styles.container}>
        <div
          className={classNames(styles.graph, {
            [styles.active]: editActive,
          })}
        >
          <Scatter
            data={
              editable
                ? Object.values(graphData).map(([key, value]) => ({
                    id: key,
                    data: Object.entries(value)
                      .filter(
                        ([, values]) => values[0] !== '' && values[1] !== ''
                      )
                      .map(([, values]) => ({
                        x: values[0],
                        y: values[1],
                      })),
                  }))
                : Object.entries(data).map(([key, value]) => ({
                    id: key,
                    data: Object.entries(value).map(([, values]) => ({
                      x: values[0],
                      y: values[1],
                    })),
                  }))
            }
            {...config}
            blendMode={theme == 'dark' ? 'normal' : 'multiply'}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: editableLegendX,
              legendPosition: 'middle',
              legendOffset: 46,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: editableLegendY,
              legendPosition: 'middle',
              legendOffset: -60,
            }}
            legends={
              legendVisible
                ? [
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 130,
                      translateY: 0,
                      itemWidth: 100,
                      itemHeight: 12,
                      itemsSpacing: 5,
                      itemDirection: 'left-to-right',
                      symbolSize: 12,
                      symbolShape: 'circle',
                    },
                  ]
                : []
            }
            theme={theme == 'dark' ? darkTheme : lightTheme}
          />
        </div>
        {editable && !editActive && (
          <IconButton
            onClick={() => {
              setEditActive(true)
            }}
          >
            {edit}
          </IconButton>
        )}
        {editable && updateNode && editActive && (
          <>
            <div className={styles.panel}>
              <EditPointGraphPanel
                data={graphData}
                legendX={editableLegendX}
                legendY={editableLegendY}
                legendVisible={legendVisible}
                handleDataChange={setGraphData}
                handleLegendXChange={handleLegendXChange}
                handleLegendYChange={handleLegendYChange}
                handleLegendVisibleChange={handleLegendVisibleChange}
              />
            </div>
            <IconButton
              disabled={
                editableLegendX == '' ||
                editableLegendY == '' ||
                Object.values(graphData).filter(
                  (v) => v[0] == '' || v[1].length == 0
                ).length > 0 ||
                nullDataPoint
              }
              toolTip="Check empty fields"
              onClick={async () => {
                setEditActive(false)
                updateNode({
                  ...nodeData,
                  data: Object.fromEntries(
                    Object.values(graphData).filter((v) => v[1].length !== 0)
                  ),
                  legendX: editableLegendX,
                  legendY: editableLegendY,
                })
              }}
            >
              {save}
            </IconButton>
          </>
        )}
      </div>
    </GraphNodeWrapper>
  )
}
