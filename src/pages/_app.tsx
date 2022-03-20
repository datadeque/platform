import type { AppProps } from 'next/app'

import { Compose, Header, Footer } from 'src/components'
import {
  ApolloClientProvider,
  AuthContextProvider,
  ModalContextProvider,
  ThemeContextProvider,
} from 'src/providers'

import 'src/styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Compose
      components={[
        ThemeContextProvider,
        ApolloClientProvider,
        AuthContextProvider,
        ModalContextProvider,
      ]}
    >
      <div className="main">
        <Header />
        <div className="content">
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </Compose>
  )
}

export default MyApp
