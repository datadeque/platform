/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react'
import { ProjectListItem } from 'src/components'

let count = 0

const initialState = {
  title: 'My Project ',
  nodes: 0,
  views: 0,
}

const NewProject = () => {
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'long' }) + ' '
  const lastEdit =
    'Last edited: ' + month + date.getUTCDate() + ', ' + date.getUTCFullYear()
  const title = initialState.title + count
  return (
    <ProjectListItem
      title={title}
      lastEdited={lastEdit}
      nodes={initialState.nodes}
      views={initialState.views}
    />
  )
}

export const useProjects = () => {
  const [projectList, setProjectList] = useState([] as any)
  const [visibility, setVisibility] = useState('private')

  const handleAddProject = useCallback(() => {
    setProjectList(projectList.concat(<NewProject key={'project' + count} />))
    count += 1
  }, [projectList])

  const toggleVisibility = useCallback(() => {
    if (visibility == 'public') {
      setVisibility('private')
    } else {
      setVisibility('public')
    }
  }, [visibility])

  return {
    projectList,
    handleAddProject,
    toggleVisibility,
    visibility,
  }
}
