import { gql, useQuery } from '@apollo/client'

const projectsQuery = gql`
  query Projects {
    projects {
      id
      name
      description
      ownerName
      public
    }
  }
`

export const useProjectsQuery = () => {
  return useQuery(projectsQuery)
}
