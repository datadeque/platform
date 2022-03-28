import { useCallback, useContext, useEffect, useState } from 'react'

import { ResponsivePie as Pie } from '@nivo/pie'
import { v4 as uuid } from 'uuid'

import { ThemeContext } from 'src/contexts'
import { IconButton, GraphNodeWrapper, EditGraphPanel } from 'src/components'
import { lightTheme, darkTheme } from 'src/components/Nodes/theme'
import { config } from './config'
import styles from 'src/components/Nodes/Nodes.module.scss'
import { EditableGraphData, NodeData } from 'src/types/data/base'
import { edit, save } from 'src/components/IconButton/icons'
import classNames from 'classnames'

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
        <div
          className={classNames(styles.graph, {
            [styles.active]: editActive,
          })}
        >
          <Pie
            data={
              editable
                ? Object.values(graphData)
                    .filter(([, value]) => value !== '')
                    .map(([key, value]) => ({
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
            {...config}
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
              <EditGraphPanel
                data={graphData}
                handleDataChange={setGraphData}
              />
            </div>
            <IconButton
              disabled={
                Object.entries(graphData).filter(([k]) => k == '').length > 0 ||
                Object.values(graphData).filter(([, value]) => value == '')
                  .length > 0
              }
              toolTip="Check empty fields"
              onClick={async () => {
                setEditActive(false)
                updateNode({
                  ...nodeData,
                  data: Object.fromEntries(
                    Object.values(graphData).filter(([, value]) => value !== '')
                  ),
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
