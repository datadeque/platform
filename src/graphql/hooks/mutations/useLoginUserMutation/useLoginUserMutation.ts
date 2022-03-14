import { gql, useMutation } from '@apollo/client'

const loginUserMutation = gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      user {
        email
        username
        id
      }
    }
  }
`

export const useLoginUserMutation = () => {
  return useMutation(loginUserMutation)
}
