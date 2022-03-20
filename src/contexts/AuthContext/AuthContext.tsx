import { createContext } from 'react'
import { User } from 'src/types'

interface IAuthContext {
  user: User | null
  loading: boolean
  error: string
  refetch: () => void
  setSignedIn: (arg0: boolean) => void
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: false,
  error: '',
  refetch: () => {
    throw new Error('poorly provided AuthContext, missing refetch')
  },
  setSignedIn: () => {
    throw new Error('poorly provided AuthContext, missing signout')
  },
})
