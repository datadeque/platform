import { ChangeEvent } from 'react'
import { EditableGraphData } from 'src/types'

import styles from './EditGraphPanel.module.scss'

interface Props {
  data: EditableGraphData
  legend: string
  handleDataChange: (newData: EditableGraphData) => void
  handleLegendChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const EditGraphPanel: React.FC<Props> = (props: Props) => {
  const { data, legend, handleLegendChange, handleDataChange } = props

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
        </tbody>
      </table>
      <p>Legend</p>
      <input value={legend} onChange={handleLegendChange} />
    </div>
  )
}
