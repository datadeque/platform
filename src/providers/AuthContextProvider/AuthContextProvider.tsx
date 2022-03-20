import { ReactNode } from 'react'
import { AuthContext } from 'src/contexts'
import { useProfileQuery } from 'src/graphql/hooks'
import { useLocalStorage } from 'src/hooks'

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const [signedIn, setSignedIn] = useLocalStorage('CLIENT:SIGNED_IN', false)
  const { data, error, loading, refetch } = useProfileQuery()

  return (
    <AuthContext.Provider
      value={{
        user: signedIn ? data?.profile : null,
        error: error ? error.message : '',
        loading,
        refetch,
        setSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
