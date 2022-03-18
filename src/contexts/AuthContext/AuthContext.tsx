import { createContext } from 'react'
import { User } from 'src/types'

interface IAuthContext {
  user: User | null
  loading: boolean
  error: string
  refetch: () => void
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: false,
  error: '',
  refetch: () => {
    throw new Error('poorly provided AuthContext, missing refetch')
  },
})
