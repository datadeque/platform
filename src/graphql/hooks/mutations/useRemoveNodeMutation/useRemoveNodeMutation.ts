import { gql, useMutation } from '@apollo/client'

const removeNodeMutation = gql`
  mutation RemoveNode($id: String!) {
    removeNode(id: $id) {
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
