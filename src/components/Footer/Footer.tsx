import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
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
    </footer>
  )
}
