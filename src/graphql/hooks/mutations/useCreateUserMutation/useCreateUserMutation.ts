import { gql, useMutation } from '@apollo/client'

const createUserMutation = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      user {
        id
        username
        email
      }
    }
  }
`

export const useCreateUserMutation = () => {
  return useMutation(createUserMutation)
}
