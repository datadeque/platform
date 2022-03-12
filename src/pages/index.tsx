import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useCallback } from 'react'

import { Button } from 'src/components'
import { useParticles } from 'src/hooks'

import styles from 'src/styles/Landing.module.scss'

const Home: NextPage = () => {
  const { push } = useRouter()

  const handleClick = useCallback(() => {
    push('/authenticate')
  }, [push])

  useParticles('container')

  return (
    <div className={styles.container} id="container">
      <div className={styles.content}>
        <div className={styles.title}>DATADEQUE</div>
        Simplify publishing interactive data visualization and insights for
        everybody
        <Button label="Get Started" size="lg" onClick={handleClick} />
      </div>
    </div>
  )
}

export default Home
