import { ReactNode } from 'react'
import styles from './ProjectListItem.module.scss'
import { Button, DropdownMenu } from 'src/components/'

interface Props {
  title: string
  lastEdited: string
  nodes: number
  visibility: string
  actionMenuRoot: {
    onClick: VoidFunction
    label: string | ReactNode
  }
  actionMenuLast: {
    onClick: VoidFunction
    label: string | ReactNode
  }
  actionMenuOptions: {
    onClick: VoidFunction
    label: string | ReactNode
  }[]
  onClick?: VoidFunction
}

const bubbleMenuIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
      strokeWidth="1.5"
    />
    <path
      d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
      strokeWidth="1.5"
    />
    <path
      d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
      strokeWidth="1.5"
    />
  </svg>
)

export const ProjectListItem: React.FC<Props> = ({
  title,
  lastEdited,
  nodes,
  visibility,
  actionMenuRoot,
  actionMenuLast,
  actionMenuOptions,
  onClick,
}: Props) => {
  const header = (
    <div className={styles.header}>
      <h2>{title}</h2>
      <h3>{lastEdited}</h3>
    </div>
  )

  const projectInfo = (
    <div className={styles.info}>
      <Button label="Edit" onClick={onClick} />
      <p>{nodes}</p>
      <p>{visibility}</p>
      <DropdownMenu
        main={bubbleMenuIcon}
        options={actionMenuOptions}
        rootOption={actionMenuRoot}
        lastOption={actionMenuLast}
      />
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.picture} />
          {header}
        </div>
        {projectInfo}
      </div>
    </div>
  )
}
