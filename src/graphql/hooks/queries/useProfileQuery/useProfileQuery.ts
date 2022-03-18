import { gql, useQuery } from '@apollo/client'

const profileQuery = gql`
  query Profile {
    profile {
      id
      username
      email
    }
  }
`

export const useProfileQuery = () => {
  return useQuery(profileQuery)
}
