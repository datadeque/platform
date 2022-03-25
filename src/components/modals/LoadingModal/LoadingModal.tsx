/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import styles from './LoadingModal.module.scss'
import { ModalWrapper } from 'src/components/wrappers/ModalWrapper'
import { LoadingSpinner } from 'src/components'
import { useCallback, useContext } from 'react'
import { ModalContext } from 'src/contexts'

export const LoadingModal = () => {
  const {
    useLoadingModalState: [, setLoadingModalState],
  } = useContext(ModalContext)

  const handleLoaded = useCallback(() => {
    setLoadingModalState(false)
  }, [, setLoadingModalState])

  return (
    <ModalWrapper>
      <div className={styles.container}>
        <LoadingSpinner />
        <h2>Loading...</h2>
      </div>
    </ModalWrapper>
  )
}
