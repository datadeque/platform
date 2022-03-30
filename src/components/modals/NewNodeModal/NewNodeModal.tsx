/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEvent, useCallback, useContext, useState } from 'react'

import { ModalWrapper } from 'src/components/wrappers/ModalWrapper'
import { TextField, Button, BarGraphNode, PieGraphNode } from 'src/components'
import { close, bar, pie, scatter, line } from '../NewProjectModal/icons'

import styles from '../NewProjectModal/NewProjectModal.module.scss'
import style from './NewNodeModal.module.scss'
import { defaultNodeData } from 'src/constants'
import { useCreateNodeMutation } from 'src/graphql/hooks'
import { ApolloError } from '@apollo/client'
import { ModalContext } from 'src/contexts'
import { useRouter } from 'next/router'

const initialData = {
  graphName: '',
  description: '',
  graphType: 'BAR',
}

export const NewNodeModal = () => {
  const [data, setData] = useState({ ...initialData })
  const {
    useNewNodeModalState: [, setNewNodeModalState],
  } = useContext(ModalContext)
  const [createNode] = useCreateNodeMutation()
  const { push } = useRouter()

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, graphName: e.target.value })
    },
    [data]
  )

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setData({ ...data, description: e.target.value })
    },
    [data]
  )

  const handleCreateNode = useCallback(async () => {
    const title = data.graphName
    const description = data.description
    const graphType = data.graphType
    try {
      await createNode({
        variables: {
          createNodeInput: {
            type: graphType,
            data: JSON.stringify({
              ...defaultNodeData,
              title: title,
              description: description,
            }),
          },
        },
      })
      setNewNodeModalState(false)
    } catch (err) {
      console.log((err as ApolloError).message)
    }
  }, [
    createNode,
    data.description,
    data.graphName,
    data.graphType,
    setNewNodeModalState,
  ])

  return (
    <ModalWrapper>
      <div className={styles.container}>
        <div className={styles.fields}>
          <div className={styles.header}>
            <h1>New Graph</h1>
            <svg onClick={() => setNewNodeModalState(false)}>{close}</svg>
          </div>
          <TextField
            label="Graph Name"
            variant="outlined"
            value={data.graphName}
            onChange={handleNameChange}
          />
          <fieldset className={styles.fieldset}>
            <legend>Description</legend>
            <textarea
              className={styles.textarea}
              name="description"
              rows={4}
              value={data.description}
              onChange={handleDescriptionChange}
            />
          </fieldset>
          <div className={styles.component}>
            <h2>Graph Type</h2>
            <div className={styles.buttonx}>
              <div className={styles.buttony}>
                <button
                  className={styles.button}
                  onClick={() => setData({ ...data, graphType: 'BAR' })}
                >
                  <svg>{bar}</svg>Bar
                </button>
                <button
                  className={styles.button}
                  disabled={true}
                  onClick={() => setData({ ...data, graphType: 'LINE' })}
                >
                  <svg>{line}</svg>Line
                </button>
              </div>
              <div className={styles.buttony}>
                <button
                  className={styles.button}
                  onClick={() => setData({ ...data, graphType: 'PIE' })}
                >
                  <svg>{pie}</svg>Pie
                </button>
                <button
                  className={styles.button}
                  disabled={true}
                  onClick={() => setData({ ...data, graphType: 'SCATTER' })}
                >
                  <svg>{scatter}</svg>Scatter
                </button>
              </div>
            </div>
          </div>
          <Button
            label="Create Graph"
            onClick={handleCreateNode}
            disabled={data.graphName == '' || data.description == ''}
          />
        </div>
        <div className={styles.panel}>
          <div className={style.graph}>
            {(data.graphType === 'BAR' && (
              <BarGraphNode
                nodeData={{
                  ...defaultNodeData,
                  title: data.graphName ? data.graphName : 'Default Title',
                  description: data.description
                    ? data.description
                    : 'Default description',
                }}
                id="sample"
              />
            )) ||
              (data.graphType === 'PIE' && (
                <PieGraphNode
                  nodeData={{
                    ...defaultNodeData,
                    title: data.graphName ? data.graphName : 'Default Title',
                    description: data.description
                      ? data.description
                      : 'Default description',
                  }}
                  id="sample"
                />
              ))}
          </div>
        </div>
        <div
          className={styles.close}
          onClick={() => setNewNodeModalState(false)}
        >
          <svg>{close}</svg>
        </div>
      </div>
    </ModalWrapper>
  )
}
