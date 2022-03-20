import { gql, useQuery } from '@apollo/client'

const publicProjectQuery = gql`
  query PublicProject($author: String!, $name: String!) {
    publicProject(author: $author, name: $name) {
      id
      name
      ownerName
      description
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

export const usePublicProjectQuery = (author: string, name: string) => {
  return useQuery(publicProjectQuery, { variables: { author, name } })
}
