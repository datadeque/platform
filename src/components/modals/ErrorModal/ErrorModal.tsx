/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { close, error } from './icons'

import styles from './ErrorModal.module.scss'
import { ModalWrapper } from 'src/components/wrappers/ModalWrapper'
import { useCallback, useContext } from 'react'
import { ModalContext } from 'src/contexts'

export interface ErrorModalProps {
  onDismiss?: VoidFunction
  title?: string
  message?: string
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  onDismiss,
  title = 'Error',
  message = 'Please try again later',
}: ErrorModalProps) => {
  const { useErrorModalState } = useContext(ModalContext)
  const [, setErrorModalState] = useErrorModalState

  const handleClose = useCallback(() => {
    onDismiss && onDismiss()
    setErrorModalState(null)
  }, [onDismiss, setErrorModalState])

  return (
    <ModalWrapper>
      <div className={styles.container}>
        <div className={styles.close} onClick={handleClose}>
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
