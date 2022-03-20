import { ReactNode, useState } from 'react'
import { ErrorModal, ErrorModalProps, NewProjectModal } from 'src/components'
import { ModalContext } from 'src/contexts'

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const useNewProjectModalState = useState(false)
  const useErrorModalState = useState<null | ErrorModalProps>(null)
  return (
    <ModalContext.Provider
      value={{ useNewProjectModalState, useErrorModalState }}
    >
      {useErrorModalState[0] && <ErrorModal {...useErrorModalState[0]} />}
      {useNewProjectModalState[0] && <NewProjectModal />}
      {children}
    </ModalContext.Provider>
  )
}
