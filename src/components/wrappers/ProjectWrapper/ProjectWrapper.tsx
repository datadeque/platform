import { ReactNode } from 'react'

import styles from './ProjectWrapper.module.scss'

interface Props {
  title: string
  description: string
  lastEdited: string
  published: boolean
  visibility: string
  children?: ReactNode
}

export const ProjectWrapper: React.FC<Props> = ({
  title,
  description,
  lastEdited,
  published,
  visibility,
  children,
}: Props) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>
      <div className={styles.content}>
        <h3>{lastEdited}</h3>
        {description}
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}
