import { useContext } from 'react'
import { ModalContext } from 'src/contexts'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  const {
    useNewProjectModalState: [, setNewProjectModalState],
  } = useContext(ModalContext)

  return (
    <footer className={styles.footer}>
      Built by Datadeque, icons by&nbsp;
      <a
        href="https://dribbble.com/amirbaqian"
        target="_blank"
        rel="noopener noreferrer"
      >
        Amir Baqian
      </a>
      <button onClick={() => setNewProjectModalState(true)}>Click</button>
    </footer>
  )
}
