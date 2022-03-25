import { ReactNode, useState } from 'react'
import {
  ErrorModal,
  ErrorModalProps,
  NewProjectModal,
  LoadingModal,
} from 'src/components'
import { ModalContext } from 'src/contexts'

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const useNewProjectModalState = useState(false)
  const useErrorModalState = useState<null | ErrorModalProps>(null)
  const useLoadingModalState = useState(false)
  return (
    <ModalContext.Provider
      value={{
        useNewProjectModalState,
        useErrorModalState,
        useLoadingModalState,
      }}
    >
      {useErrorModalState[0] && <ErrorModal {...useErrorModalState[0]} />}
      {useNewProjectModalState[0] && <NewProjectModal />}
      {useLoadingModalState[0] && <LoadingModal />}
      {children}
    </ModalContext.Provider>
  )
}
