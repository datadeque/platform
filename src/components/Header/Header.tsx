/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useCallback, useContext, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import classNames from 'classnames'

import { AuthContext } from 'src/contexts'
import { Button, ThemeButton } from 'src/components'
import { cancelIcon, logo, menuIcon } from './icons'

import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const { pathname, push } = useRouter()
  const [menuActive, setMenuActive] = useState(false)
  const { user, loading, setSignedIn } = useContext(AuthContext)

  const handleSignOut = useCallback(() => {
    setSignedIn(false)
    push('/')
  }, [push, setSignedIn])

  const onMenuClick = useCallback(() => {
    setMenuActive(!menuActive)
  }, [menuActive])

  const handleSignInClick = useCallback(() => {
    setMenuActive(false)
    push('/authenticate')
  }, [push])

  return (
    <div className={styles.header}>
      <Link href={user ? '/projects' : '/'} passHref={true}>
        <div className={styles.icon}>{logo}</div>
      </Link>
      <div className={styles.links}>
        <ThemeButton />
        {!pathname.match('/authenticate') && !user && (
          <Button label="Sign In" onClick={handleSignInClick} />
        )}
        {user && !loading && (
          <Button label="Sign Out" onClick={handleSignOut} />
        )}
        <div className={styles.menuicon} onClick={onMenuClick}>
          {menuIcon}
        </div>
        <div
          className={classNames(styles.container, {
            [styles.active]: menuActive,
          })}
        >
          <div
            className={classNames(styles.menu, {
              [styles.active]: menuActive,
            })}
          >
            <div className={styles.topmenu}>
              <Link href="/" passHref={true}>
                <div className={styles.icon} onClick={onMenuClick}>
                  {logo}
                </div>
              </Link>
              <div className={styles.cancel} onClick={onMenuClick}>
                {cancelIcon}
              </div>
            </div>
            <div className={styles.bottommenu}>
              {!pathname.match('/authenticate') && !user && !loading && (
                <div className={styles.item} onClick={handleSignInClick}>
                  Sign In
                </div>
              )}
              {user && !loading && (
                <div className={styles.item} onClick={handleSignOut}>
                  Sign Out
                </div>
              )}
              <ThemeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
