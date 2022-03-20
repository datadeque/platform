import { createContext, Dispatch, SetStateAction } from 'react'
import { ErrorModalProps } from 'src/components'

interface IModalContext {
  useNewProjectModalState: [boolean, Dispatch<SetStateAction<boolean>>]
  useErrorModalState: [
    null | ErrorModalProps,
    Dispatch<SetStateAction<null | ErrorModalProps>>
  ]
}

const fn = () => {
  throw new Error('ModalContext poorly provided')
}

export const ModalContext = createContext<IModalContext>({
  useNewProjectModalState: [false, fn],
  useErrorModalState: [null, fn],
})
