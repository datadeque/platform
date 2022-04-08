import { gql, useMutation } from '@apollo/client'

const logoutUserMutation = gql`
  mutation LogoutUser {
    logoutUser {
      success
    }
  }
`
export const useLogoutUserMutation = () => {
  return useMutation(logoutUserMutation)
}
