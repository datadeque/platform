import { ResponsiveBar as Bar } from '@nivo/bar'
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { v4 as uuid } from 'uuid'

import { ThemeContext } from 'src/contexts'
import { IconButton, GraphNodeWrapper, EditGraphPanel } from 'src/components'
import { lightTheme, darkTheme } from './theme'

import styles from './BarGraphNode.module.scss'
import { EditableGraphData, NodeData } from 'src/types/data/base'
import { edit, save } from 'src/components/IconButton/icons'

interface Props {
  nodeData: NodeData
  editable?: boolean
  id: string
  updateNode?: (data: NodeData) => void
}

export const BarGraphNode: React.FC<Props> = (props: Props) => {
  const { theme } = useContext(ThemeContext)
  const { nodeData, editable = false, updateNode } = props
  const { title, description, legend, data } = nodeData

  const [editableLegend, setEditableLegend] = useState(legend)
  const [editActive, setEditActive] = useState(false)

  const [graphData, setGraphData] = useState<EditableGraphData>({})

  useEffect(() => {
    setGraphData(
      Object.fromEntries(
        Object.entries(nodeData.data).map((entry) => [uuid(), entry])
      )
    )
  }, [nodeData])

  const handleLegendChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditableLegend(e.target.value)
  }, [])

  return (
    <GraphNodeWrapper
      title={title}
      description={description}
      editable={editable}
    >
      <div className={styles.container}>
        <div className={editActive ? styles.editable : styles.graph}>
          <Bar
            data={
              editable
                ? Object.values(graphData).map(([key, value]) => ({
                    label: key,
                    value,
                  }))
                : Object.entries(data).map(([key, value]) => ({
                    label: key,
                    value,
                  }))
            }
            indexBy="label"
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            colors={{ scheme: 'green_blue' }}
            colorBy="indexValue"
            axisRight={null}
            axisBottom={null}
            enableGridX={false}
            enableGridY={false}
            borderWidth={0}
            borderRadius={5}
            axisTop={{
              legend: editActive ? editableLegend : legend,
              tickValues: [],
              legendPosition: 'middle',
            }}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            role="application"
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
          <div className={styles.panel}>
            <EditGraphPanel
              data={graphData}
              legend={editableLegend}
              handleLegendChange={handleLegendChange}
              handleDataChange={setGraphData}
            />
            <IconButton
              onClick={async () => {
                setEditActive(false)
                updateNode({
                  ...nodeData,
                  data: Object.fromEntries(Object.values(graphData)),
                })
              }}
            >
              {save}
            </IconButton>
          </div>
        )}
      </div>
    </GraphNodeWrapper>
  )
}
