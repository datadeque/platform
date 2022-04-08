import { ReactNode, useCallback, useEffect } from 'react'
import { AuthContext } from 'src/contexts'
import { useLogoutUserMutation, useProfileQuery } from 'src/graphql/hooks'

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  const [logoutUser] = useLogoutUserMutation()
  const { data, error, loading, refetch } = useProfileQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  const logout = useCallback(async () => {
    await logoutUser()
    refetch()
  }, [logoutUser, refetch])

  return (
    <AuthContext.Provider
      value={{
        user: error ? null : data?.profile,
        error: error ? error.message : '',
        loading,
        refetch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
