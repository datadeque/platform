import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IconButton, ProjectListItem, SearchBar } from 'src/components'
import { add } from 'src/components/IconButton/icons'
import { ModalContext, ProjectsContext } from 'src/contexts'
import { ProjectsContextProvider } from 'src/providers'

import styles from './Projects.module.scss'

const ProjectsWrapper: NextPage = () => {
  return (
    <ProjectsContextProvider>
      <Projects />
    </ProjectsContextProvider>
  )
}

const Projects: React.FC = () => {
  const {
    useNewProjectModalState: [, setNewProjectModalState],
  } = useContext(ModalContext)

  const { push } = useRouter()

  const { projects, useQueryState, deleteProject } = useContext(ProjectsContext)

  const [query, setQuery] = useQueryState

  return (
    <div className={styles.container}>
      <div className={styles.projects}>
        <div className={styles.header}>
          <SearchBar
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
          <IconButton onClick={() => setNewProjectModalState(true)}>
            {add}
          </IconButton>
        </div>
        <div className={styles.list}>
          {projects?.map((project) => (
            <ProjectListItem
              title={project.name}
              lastEdited={'never'}
              nodes={1}
              visibility={project.public ? 'public' : 'private'}
              actionMenuRoot={{
                onClick: () => push(`${project.ownerName}/${project.name}`),
                label: 'View',
              }}
              actionMenuLast={{
                onClick: () => deleteProject(project.id),
                label: 'Delete',
              }}
              actionMenuOptions={[
                {
                  onClick: () =>
                    push(`${project.ownerName}/${project.name}/edit`),
                  label: 'Edit',
                },
              ]}
              onClick={() => push(`${project.ownerName}/${project.name}/edit`)}
              key={project.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsWrapper
