import styles from './LoadingModal.module.scss'
import { ModalWrapper } from 'src/components/wrappers/ModalWrapper'
import { LoadingSpinner } from 'src/components'

export const LoadingModal = () => {
  return (
    <ModalWrapper>
      <div className={styles.container}>
        <LoadingSpinner />
        <h2>Loading...</h2>
      </div>
    </ModalWrapper>
  )
}
