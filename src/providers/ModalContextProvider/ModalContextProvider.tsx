import { ReactNode, useState } from 'react'
import { NewProjectModal } from 'src/components'
import { ModalContext } from 'src/contexts'

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const useProjectModalState = useState(false)
  return (
    <ModalContext.Provider value={{ useProjectModalState }}>
      {useProjectModalState[0] && <NewProjectModal />}
      {children}
    </ModalContext.Provider>
  )
}
