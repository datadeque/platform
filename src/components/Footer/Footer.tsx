import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      Built by Datadeque,
      <a
        href="https://github.com/UTSCC09/project-datadeque/blob/main/README.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        Credits & Acknowledgements
      </a>
    </footer>
  )
}
