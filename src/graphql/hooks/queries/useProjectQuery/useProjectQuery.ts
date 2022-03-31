import { gql, useQuery } from '@apollo/client'

export const projectQuery = gql`
  query Project($name: String!) {
    project(name: $name) {
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

export const useProjectQuery = (ownerName: string, name: string) => {
  return useQuery(projectQuery, { variables: { ownerName, name } })
}
