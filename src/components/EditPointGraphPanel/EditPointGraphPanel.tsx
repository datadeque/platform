import { ChangeEvent, Fragment, useState } from 'react'

import { v4 as uuid } from 'uuid'
import _ from 'lodash'

import { EditablePointGraphData } from 'src/types'
import { Button, IconButton } from 'src/components'
import { add, remove } from 'src/components/IconButton/icons'

import styles from 'src/components/EditGraphPanel/EditGraphPanel.module.scss'

interface Props {
  data: EditablePointGraphData
  legendX: string
  legendY: string
  legendVisible: boolean
  handleDataChange: (newData: EditablePointGraphData) => void
  handleLegendXChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLegendYChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLegendVisibleChange: () => void
}

export const EditPointGraphPanel: React.FC<Props> = (props: Props) => {
  const {
    data,
    legendX,
    legendY,
    legendVisible,
    handleLegendXChange,
    handleLegendYChange,
    handleDataChange,
    handleLegendVisibleChange,
  } = props
  let newXs: { [id: string]: number | string } = {}
  let newYs: { [id: string]: number | string } = {}
  for (const key in data) {
    newXs = { ...newXs, [key]: '' }
    newYs = { ...newYs, [key]: '' }
  }
  const [newX, setNewX] = useState(newXs)
  const [newY, setNewY] = useState(newYs)
  const [newGroup, setNewGroup] = useState('')

  return (
    <div className={styles.container}>
      <table>
        <tbody>
          {Object.entries(data).map(([id, [label, values]]) => (
            <Fragment key={id}>
              <tr key={id}>
                <td colSpan={2}>
                  <input
                    value={label}
                    onChange={(e) => {
                      handleDataChange({
                        ...data,
                        [id]: [e.target.value, values],
                      })
                    }}
                  />
                </td>
                <td>
                  <IconButton
                    onClick={() => {
                      delete data[id]
                      handleDataChange({
                        ...data,
                      })
                    }}
                  >
                    {remove}
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th>x</th>
                <th>y</th>
              </tr>
              {values.map(([x, y], index) => (
                <tr key={`${id}-${index}`}>
                  <td>
                    <input
                      value={x}
                      onChange={(e) => {
                        const newValues = values.concat([])
                        newValues[index][0] =
                          parseInt(e.target.value) >= 0
                            ? parseInt(e.target.value)
                            : ''
                        handleDataChange({
                          ...data,
                          [id]: [label, newValues],
                        })
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={y}
                      onChange={(e) => {
                        const newValues = values.concat([])
                        newValues[index][1] =
                          parseInt(e.target.value) >= 0
                            ? parseInt(e.target.value)
                            : ''
                        handleDataChange({
                          ...data,
                          [id]: [label, newValues],
                        })
                      }}
                    />
                  </td>
                  <td>
                    <IconButton
                      onClick={() => {
                        let newValues = values.concat([])
                        newValues = newValues.filter(
                          (pair) => !_.isEqual(pair, [x, y])
                        )
                        handleDataChange({
                          ...data,
                          [id]: [label, newValues],
                        })
                      }}
                    >
                      {remove}
                    </IconButton>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="number"
                    value={newX[id] ?? ''}
                    onChange={(e) => {
                      setNewX({
                        ...newX,
                        [id]:
                          e.target.value == '' ? '' : parseInt(e.target.value),
                      })
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newY[id] ?? ''}
                    onChange={(e) =>
                      setNewY({
                        ...newY,
                        [id]:
                          e.target.value == '' ? '' : parseInt(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <IconButton
                    disabled={newX[id] == '' || newY[id] == ''}
                    toolTip="Check empty fields"
                    onClick={() => {
                      if (newX[id] != '' && newY[id] != '') {
                        const newValues = values.concat([])
                        newValues.push([newX[id], newY[id]])
                        handleDataChange({
                          ...data,
                          [id]: [label, newValues],
                        })
                        setNewX({ ...newX, [id]: '' })
                        setNewY({ ...newY, [id]: '' })
                      }
                    }}
                  >
                    {add}
                  </IconButton>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <div className={styles.border} />
                </td>
              </tr>
            </Fragment>
          ))}
          <tr>
            <td>
              <input
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
              />
            </td>
            <td>
              <Button
                variant="secondary"
                size="sm"
                label="Add new group"
                disabled={newGroup == ''}
                onClick={() => {
                  handleDataChange({
                    ...data,
                    [uuid()]: [newGroup, []],
                  })
                  setNewGroup('')
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.legend}>
        <Button
          size="sm"
          label={legendVisible ? 'Hide legend' : 'Show legend'}
          onClick={handleLegendVisibleChange}
        />
      </div>
      <p>X Axis Label</p>
      <input value={legendX} onChange={handleLegendXChange} />
      <p>Y Axis Label</p>
      <input value={legendY} onChange={handleLegendYChange} />
    </div>
  )
}
