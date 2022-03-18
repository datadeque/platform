import { ReactNode, useState } from 'react'
import { NewProjectModal } from 'src/components'
import { ModalContext } from 'src/contexts'

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const useNewProjectModalState = useState(false)
  return (
    <ModalContext.Provider value={{ useNewProjectModalState }}>
      {useNewProjectModalState[0] && <NewProjectModal />}
      {children}
    </ModalContext.Provider>
  )
}
