import { createContext, Dispatch, SetStateAction } from 'react'
import {
  ConfirmationModalProps,
  ErrorModalProps,
  NewNodeModalProps,
} from 'src/components'

interface IModalContext {
  useNewProjectModalState: [boolean, Dispatch<SetStateAction<boolean>>]
  useNewNodeModalState: [
    null | NewNodeModalProps,
    Dispatch<SetStateAction<null | NewNodeModalProps>>
  ]
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
  useNewNodeModalState: [null, fn],
  useErrorModalState: [null, fn],
  useLoadingModalState: [false, fn],
  useConfirmationModalState: [null, fn],
})
