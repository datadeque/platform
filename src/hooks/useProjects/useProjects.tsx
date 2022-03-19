import { ChangeEvent, useCallback, useState } from 'react'
import { ProjectWrapper } from 'src/components'

let count = 0;

const initialState = {
  title: 'My Project ',
  nodes: 0,
  views: 0,
}

const NewProject = () => {
  let date = new Date()
  let month = date.toLocaleString('default', { month: 'long' }) + ' '
  let lastEdit = 'Last edited: ' + month + date.getUTCDate() + ', ' + date.getUTCFullYear()
  let title = initialState.title + count
  return <ProjectWrapper  title={title} lastEdited={lastEdit} nodes={initialState.nodes}  views={initialState.views}/>
}


export const useProjects = () => {
  const [projectList, setProjectList] = useState([])
  const [visibility, setVisibility] = useState('private')
  const [actionMenu, setOpenActionMenu] = useState(false)
  const [sortMenu, setSortMenu] = useState(false)

  const handleAddProject = useCallback(() => {
    setProjectList(projectList.concat(<NewProject key={"project"+count}/>))
    count += 1
    console.log(projectList)
  }, [projectList])


  const handleDeleteProject = () => {
    setProjectList((projectList) => projectList.filter((project) => project.key !== key));
  };

  const toggleVisibility = useCallback(() => {
    if (visibility == 'public'){
      setVisibility('private')
    } else {
      console.log("vis priv")
      setVisibility('public')
    }
  }, [visibility])

  const toggleActionMenu = useCallback(() => {
    if (actionMenu ){
      setOpenActionMenu(false)
    } else {
      setOpenActionMenu(true)
    }
  }, [actionMenu])

  const toggleSortMenu = useCallback(() => {
    if (sortMenu ){
      setSortMenu(false)
    } else {
      setSortMenu(true)
    }
  }, [sortMenu])



  return {
    projectList,
    handleAddProject,
    handleDeleteProject,
    toggleVisibility,
    visibility,
    actionMenu,
    toggleActionMenu,
    sortMenu,
    toggleSortMenu,
  }
}
