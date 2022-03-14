import { ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'
import { client } from 'src/graphql'

export const ApolloClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
