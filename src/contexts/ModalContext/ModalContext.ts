import { createContext, Dispatch, SetStateAction } from 'react'
import { ConfirmationModalProps, ErrorModalProps } from 'src/components'

interface IModalContext {
  useNewProjectModalState: [boolean, Dispatch<SetStateAction<boolean>>]
  useNewNodeModalState: [boolean, Dispatch<SetStateAction<boolean>>]
  useErrorModalState: [
    null | ErrorModalProps,
    Dispatch<SetStateAction<null | ErrorModalProps>>
  ]
  useLoadingModalState: [boolean, Dispatch<SetStateAction<boolean>>]
  useConfirmationModalState: [
    null | ConfirmationModalProps,
    Dispatch<SetStateAction<null | ConfirmationModalProps>>
  ]
}

const fn = () => {
  throw new Error('ModalContext poorly provided')
}

export const ModalContext = createContext<IModalContext>({
  useNewProjectModalState: [false, fn],
  useNewNodeModalState: [false, fn],
  useErrorModalState: [null, fn],
  useLoadingModalState: [false, fn],
  useConfirmationModalState: [null, fn],
})
