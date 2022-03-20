import { gql, useMutation } from '@apollo/client'

const removeProjectMutation = gql`
  mutation RemoveProject($id: Int!) {
    removeProject(id: $id) {
      id
      name
      description
      ownerName
      public
      nodes {
        type
        data
        position
        id
      }
    }
  }
`

export const useRemoveProjectMutation = () => {
  return useMutation(removeProjectMutation)
}
