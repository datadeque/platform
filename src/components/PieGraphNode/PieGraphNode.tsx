import { ResponsivePie as Pie } from '@nivo/pie'

import { v4 as uuid } from 'uuid'

import { ThemeContext } from 'src/contexts'
import { IconButton, GraphNodeWrapper, EditGraphPanel } from 'src/components'
import { lightTheme, darkTheme } from 'src/components/BarGraphNode/theme'

import styles from './PieGraphNode.module.scss'
import { EditableGraphData, NodeData } from 'src/types/data/base'
import { edit, save } from 'src/components/IconButton/icons'
import { useCallback, useContext, useEffect, useState } from 'react'

interface Props {
  nodeData: NodeData
  editable?: boolean
  id: string
  updateNode?: (data: NodeData) => void
}

export const PieGraphNode: React.FC<Props> = (props: Props) => {
  const { nodeData, editable = false, updateNode } = props
  const { title, description, data } = nodeData
  const { theme } = useContext(ThemeContext)

  const [editActive, setEditActive] = useState(false)
  const [graphData, setGraphData] = useState<EditableGraphData>({})

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

  return (
    <GraphNodeWrapper
      title={title}
      onTitleSave={onTitleSave}
      onDescriptionSave={onDescriptionSave}
      description={description}
      editable={editable}
    >
      <div className={styles.container}>
        <div className={editActive ? styles.editable : styles.graph}>
          <Pie
            data={
              editable
                ? Object.values(graphData).map(([key, value]) => ({
                    id: key,
                    label: key,
                    value,
                  }))
                : Object.entries(data).map(([key, value]) => ({
                    id: key,
                    label: key,
                    value,
                  }))
            }
            margin={{ top: 10, right: 80, bottom: 70, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabel="id"
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            colors={{ scheme: 'green_blue' }}
            legends={[
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
            ]}
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
            <EditGraphPanel data={graphData} handleDataChange={setGraphData} />
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
