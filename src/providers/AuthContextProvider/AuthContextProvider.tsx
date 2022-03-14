import { ReactNode } from 'react'
import { AuthContext } from 'src/contexts'
import { useProfileQuery } from 'src/graphql/hooks'

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const { data, error, loading, refetch } = useProfileQuery()

  return (
    <AuthContext.Provider
      value={{
        user: data?.profile,
        error: error ? error.message : '',
        loading,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
