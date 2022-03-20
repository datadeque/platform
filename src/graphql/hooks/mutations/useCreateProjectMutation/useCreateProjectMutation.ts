import { gql, useMutation } from '@apollo/client'

const createProjectMutation = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      id
      name
      description
      ownerName
      public
      nodes {
        id
        position
        data
        type
      }
    }
  }
`
export const useCreateProjectMutation = () => {
  return useMutation(createProjectMutation)
}
