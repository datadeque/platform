import { ReactNode, useState } from 'react'
import {
  ErrorModal,
  ErrorModalProps,
  NewProjectModal,
  NewNodeModal,
  LoadingModal,
  ConfirmationModal,
  ConfirmationModalProps,
} from 'src/components'
import { ModalContext } from 'src/contexts'

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const useNewProjectModalState = useState(false)
  const useNewNodeModalState = useState(false)
  const useErrorModalState = useState<null | ErrorModalProps>(null)
  const useLoadingModalState = useState(false)
  const useConfirmationModalState = useState<null | ConfirmationModalProps>(
    null
  )
  return (
    <ModalContext.Provider
      value={{
        useNewProjectModalState,
        useNewNodeModalState,
        useErrorModalState,
        useLoadingModalState,
        useConfirmationModalState,
      }}
    >
      {useErrorModalState[0] && <ErrorModal {...useErrorModalState[0]} />}
      {useNewProjectModalState[0] && <NewProjectModal />}
      {useNewNodeModalState[0] && <NewNodeModal />}
      {useLoadingModalState[0] && <LoadingModal />}
      {useConfirmationModalState[0] && (
        <ConfirmationModal {...useConfirmationModalState[0]} />
      )}
      {children}
    </ModalContext.Provider>
  )
}
