import { createContext, Dispatch, SetStateAction } from 'react'

interface IModalContext {
  useNewProjectModalState: [boolean, Dispatch<SetStateAction<boolean>>]
}

const fn = () => {
  throw new Error('ModalContext poorly provided')
}

export const ModalContext = createContext<IModalContext>({
  useNewProjectModalState: [false, fn],
})
