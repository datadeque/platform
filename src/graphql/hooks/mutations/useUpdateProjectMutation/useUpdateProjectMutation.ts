import { gql, useMutation } from '@apollo/client'

const updateProjectMutation = gql`
  mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {
    updateProject(updateProjectInput: $updateProjectInput) {
      name
      id
      description
      ownerName
      public
    }
  }
`

export const useUpdateProjectMutation = () => {
  return useMutation(updateProjectMutation)
}
