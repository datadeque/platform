import 'src/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Compose } from 'src/components'
import { ThemeContextProvider } from 'src/providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Compose components={[ThemeContextProvider]}>
      <div className="main">
        <Component {...pageProps} />
      </div>
    </Compose>
  )
}

export default MyApp
