/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { close, error } from './icons'

import styles from './ErrorModal.module.scss'
import { ModalWrapper } from 'src/components/wrappers/ModalWrapper'

interface Props {
  onDismiss?: VoidFunction
  title?: string
  message?: string
}

export const ErrorModal: React.FC<Props> = ({
  onDismiss,
  title = 'Error',
  message = 'Please try again later',
}: Props) => {
  return (
    <ModalWrapper>
      <div className={styles.container}>
        <div className={styles.close} onClick={onDismiss}>
          <svg>{close}</svg>
        </div>
        <div className={styles.content}>
          {error}
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      </div>
    </ModalWrapper>
  )
}
