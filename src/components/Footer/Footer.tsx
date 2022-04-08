/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      Built by Datadeque,
      <Link href="/credits">
        <a target="_blank" rel="noopener noreferrer">
          Credits & Acknowledgements
        </a>
      </Link>
    </footer>
  )
}
