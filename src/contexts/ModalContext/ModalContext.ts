import { createContext, Dispatch, SetStateAction } from 'react'
import { ErrorModalProps, LoadingModalProps } from 'src/components'

interface IModalContext {
  useNewProjectModalState: [boolean, Dispatch<SetStateAction<boolean>>]
  useErrorModalState: [
    null | ErrorModalProps,
    Dispatch<SetStateAction<null | ErrorModalProps>>
  ]
  useLoadingModalState: [boolean, Dispatch<SetStateAction<boolean>>]
}

const fn = () => {
  throw new Error('ModalContext poorly provided')
}

export const ModalContext = createContext<IModalContext>({
  useNewProjectModalState: [false, fn],
  useErrorModalState: [null, fn],
  useLoadingModalState: [false, fn],
})
