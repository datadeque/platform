import { ChangeEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { EditableGraphData } from 'src/types'
import { IconButton } from 'src/components'
import { add } from 'src/components/IconButton/icons'

import styles from './EditGraphPanel.module.scss'

interface Props {
  data: EditableGraphData
  legend: string
  handleDataChange: (newData: EditableGraphData) => void
  handleLegendChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const EditGraphPanel: React.FC<Props> = (props: Props) => {
  const { data, legend, handleLegendChange, handleDataChange } = props
  const [newLabel, setNewLabel] = useState('')
  const [newValue, setNewValue] = useState<number | null>(null)

  return (
    <div className={styles.container}>
      <table>
        <tbody>
          <tr>
            <th>Label</th>
            <th>Value</th>
          </tr>
          {Object.entries(data).map(([id, [label, value]]) => (
            <tr key={id}>
              <td>
                <input
                  value={data[id][0]}
                  onChange={(e) => {
                    handleDataChange({
                      ...data,
                      [id]: [e.target.value, value],
                    })
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => {
                    handleDataChange({
                      ...data,
                      [id]: [label, parseInt(e.target.value)],
                    })
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={newValue ?? ''}
                onChange={(e) => setNewValue(parseInt(e.target.value))}
              />
            </td>
            <IconButton
              onClick={() => {
                handleDataChange({
                  ...data,
                  [uuid()]: [newLabel, newValue ?? 0],
                })
                setNewLabel('')
                setNewValue(null)
              }}
            >
              {add}
            </IconButton>
          </tr>
        </tbody>
      </table>
      <p>Legend</p>
      <input value={legend} onChange={handleLegendChange} />
    </div>
  )
}
