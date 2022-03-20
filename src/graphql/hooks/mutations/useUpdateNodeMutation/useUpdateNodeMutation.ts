import { gql, useMutation } from '@apollo/client'

const updateNodeMutation = gql`
  mutation UpdateNode($updateNodeInput: UpdateNodeInput!) {
    updateNode(updateNodeInput: $updateNodeInput) {
      id
      position
      data
      type
    }
  }
`

export const useUpdateNodeMutation = () => {
  return useMutation(updateNodeMutation)
}
