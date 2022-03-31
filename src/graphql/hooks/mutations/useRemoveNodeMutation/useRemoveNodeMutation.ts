import { gql, useMutation } from '@apollo/client'

const removeNodeMutation = gql`
  mutation RemoveNode($removeNodeId: String!) {
    removeNode(id: $removeNodeId) {
      id
      position
      data
      type
    }
  }
`

export const useRemoveNodeMutation = () => {
  return useMutation(removeNodeMutation)
}
