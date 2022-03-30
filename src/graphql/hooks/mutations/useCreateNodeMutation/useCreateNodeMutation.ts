import { gql, useMutation } from '@apollo/client'

const createNodeMutation = gql`
  mutation createNode($createNodeInput: createNodeInput!) {
    createNode(createNodeInput: $createNodeInput) {
      title
      description
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
