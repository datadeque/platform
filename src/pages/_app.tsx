import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

import { Compose, Header, Footer } from 'src/components'
import { ThemeContextProvider } from 'src/providers'

import 'src/styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <Compose components={[ThemeContextProvider]}>
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
