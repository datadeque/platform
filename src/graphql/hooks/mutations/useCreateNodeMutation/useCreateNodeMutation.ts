import { gql, useMutation } from '@apollo/client'

const createNodeMutation = gql`
  mutation createNode($createNodeInput: CreateNodeInput!) {
    createNode(createNodeInput: $createNodeInput) {
      id
      position
      data
      type
    }
  }
`

export const useCreateNodeMutation = () => {
  return useMutation(createNodeMutation)
}
