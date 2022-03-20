/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEvent, useCallback, useContext, useState } from 'react'

import { ModalWrapper } from 'src/components/wrappers/ModalWrapper'
import { TextField, Button, RootNode } from 'src/components'
import { close, lock, unlock, bar, pie, scatter, line } from './icons'

import styles from './NewProjectModal.module.scss'
import { BarGraphNode } from 'src/components/BarGraphNode'
import { defaultNodeData } from 'src/constants'
import { useCreateProjectMutation } from 'src/graphql/hooks'
import { ApolloError } from '@apollo/client'
import { ModalContext } from 'src/contexts'
import { useRouter } from 'next/router'

const initialData = {
  projectName: '',
  description: '',
  graphType: 'BAR',
  visibility: 'private',
}

export const NewProjectModal = () => {
  const [data, setData] = useState({ ...initialData })
  const {
    useNewProjectModalState: [, setNewProjectModalState],
  } = useContext(ModalContext)
  const [createProject] = useCreateProjectMutation()
  const { push } = useRouter()

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, projectName: e.target.value })
    },
    [data]
  )

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setData({ ...data, description: e.target.value })
    },
    [data]
  )

  const handleCreate = useCallback(async () => {
    const name = data.projectName
    const description = data.description
    const visibility = data.visibility == 'public' ? true : false
    const initialNodeType = data.graphType
    try {
      const res = await createProject({
        variables: {
          createProjectInput: {
            name,
            description,
            public: visibility,
            initialNodeType,
          },
        },
      })
      push(
        `/${res.data.createProject.ownerName}/${res.data.createProject.name}/edit/`
      )
      setNewProjectModalState(false)
    } catch (err) {
      console.log((err as ApolloError).message)
    }
  }, [
    createProject,
    data.description,
    data.graphType,
    data.projectName,
    data.visibility,
    push,
    setNewProjectModalState,
  ])

  return (
    <ModalWrapper>
      <div className={styles.container}>
        <div className={styles.fields}>
          <div className={styles.header}>
            <h1>New Project</h1>
            <svg onClick={() => setNewProjectModalState(false)}>{close}</svg>
          </div>
          <TextField
            label="Project Name"
            variant="outlined"
            value={data.projectName}
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
            <h2>Project Visibiliy</h2>
            <div className={styles.input}>
              <input
                type="checkbox"
                name="private"
                value="private"
                onClick={() => {
                  setData({ ...data, visibility: 'private' })
                }}
                checked={data.visibility == 'private'}
              />
              <svg>{lock}</svg>
              <label htmlFor="private" className={styles.label}>
                Private
                <h3>Only you can view your project</h3>
              </label>
            </div>
            <div className={styles.input}>
              <input
                type="checkbox"
                name="public"
                value="public"
                onClick={() => {
                  setData({ ...data, visibility: 'public' })
                }}
                checked={data.visibility == 'public'}
              />
              <svg>{unlock}</svg>
              <label htmlFor="public" className={styles.label}>
                Public
                <h3>Anyone can view your project</h3>
              </label>
            </div>
          </div>
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
                  title="Coming Soon!"
                  onClick={() => setData({ ...data, graphType: 'LINE' })}
                >
                  <svg>{line}</svg>Line
                </button>
              </div>
              <div className={styles.buttony}>
                <button
                  className={styles.button}
                  disabled={true}
                  title="Coming Soon!"
                  onClick={() => setData({ ...data, graphType: 'PIE' })}
                >
                  <svg>{pie}</svg>Pie
                </button>
                <button
                  className={styles.button}
                  disabled={true}
                  title="Coming Soon!"
                  onClick={() => setData({ ...data, graphType: 'SCATTER' })}
                >
                  <svg>{scatter}</svg>Scatter
                </button>
              </div>
            </div>
          </div>
          <Button
            label="Create Project"
            onClick={handleCreate}
            disabled={data.projectName == '' || data.description == ''}
          />
        </div>
        <div className={styles.panel}>
          <div className={styles.root}>
            <RootNode
              title={data.projectName ? data.projectName : 'Project Name'}
              description={data.description ? data.description : 'Description'}
            />
          </div>
          <div className={styles.graph}>
            <BarGraphNode nodeData={defaultNodeData} id="sample" />
          </div>
        </div>
        <div
          className={styles.close}
          onClick={() => setNewProjectModalState(false)}
        />
        <div
          className={styles.close}
          onClick={() => setNewProjectModalState(false)}
        >
          <svg>{close}</svg>
        </div>
      </div>
    </ModalWrapper>
  )
}
