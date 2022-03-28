import { useCallback, useContext } from 'react'

import { IconButton, Button, ModalWrapper } from 'src/components'
import { ModalContext } from 'src/contexts'
import { close } from 'src/components/IconButton/icons'
import styles from './ConfirmationModal.module.scss'

export interface ConfirmationModalProps {
  title: string
  content?: string
  onConfirm: VoidFunction
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = (
  props: ConfirmationModalProps
) => {
  const { title, content, onConfirm } = props
  const {
    useConfirmationModalState: [, setConfirmationModalState],
  } = useContext(ModalContext)

  const handleCloseClick = useCallback(() => {
    setConfirmationModalState(null)
  }, [setConfirmationModalState])

  return (
    <ModalWrapper>
      <div className={styles.container}>
        <div className={styles.close}>
          <IconButton onClick={handleCloseClick}>{close}</IconButton>
        </div>
        <h2>{title}</h2>
        {content && <p>{content}</p>}
        <div className={styles.buttons}>
          <Button
            label="No"
            variant="secondary"
            onClick={handleCloseClick}
            size="lg"
          />
          <Button
            label="Yes"
            onClick={() => {
              onConfirm()
              handleCloseClick()
            }}
            size="lg"
          />
        </div>
      </div>
    </ModalWrapper>
  )
}
