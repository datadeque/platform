import styles from './ModalWrapper.module.scss'

interface Props {
  children: React.ReactNode
}

export const ModalWrapper: React.FC<Props> = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>
}
