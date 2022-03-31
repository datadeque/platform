import Image from 'next/image'
import { useContext, useState } from 'react'

import { ThemeContext } from 'src/contexts'
import { EditableHeading, EditableDescription } from 'src/components'

import styles from './RootNode.module.scss'

interface Props {
  title: string
  description: string
  editable?: boolean
  updateProject?: ({
    name,
    description,
  }: {
    name?: string
    description?: string
  }) => void
}

const lightImageURL =
  'https://images.unsplash.com/photo-1578010908802-cd7e5cd853c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
const darkImageURL =
  'https://images.unsplash.com/photo-1614473335239-d70e1ccac1b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

export const RootNode: React.FC<Props> = (props: Props) => {
  const { theme } = useContext(ThemeContext)
  const { title, description, editable = false, updateProject } = props
  const [titleText, setTitleText] = useState(title)
  const [descriptionText, setDescriptionText] = useState(description)

  return (
    <div className={styles.container}>
      <Image
        src={theme == 'dark' ? darkImageURL : lightImageURL}
        layout="fill"
        objectFit="cover"
        alt="Toronto Skyline"
      />
      <div className={styles.box}>
        {editable ? (
          <EditableHeading
            value={titleText}
            className={styles.editable}
            onChange={(e) => setTitleText(e.target.value.replace(/\s/g, '-'))}
            onSave={updateProject && (() => updateProject({ name: titleText }))}
          />
        ) : (
          <h1>{titleText}</h1>
        )}
        {editable ? (
          <EditableDescription
            value={descriptionText}
            className={styles.editable}
            onChange={(e) => setDescriptionText(e.target.value)}
            onSave={
              updateProject &&
              (() => updateProject({ description: descriptionText }))
            }
          />
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>
  )
}
