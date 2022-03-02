import { ReactNode } from 'react'

import styles from './SectionWrapper.module.scss'

interface Props {
  title: string
  description: string
  children?: ReactNode
}

export const SectionWrapper: React.FC<Props> = ({
  title,
  description,
  children,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>{title}</h2>
        {description}
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}
