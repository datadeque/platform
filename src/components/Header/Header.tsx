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
  const { user } = useContext(AuthContext)

  const onMenuClick = useCallback(() => {
    setMenuActive(!menuActive)
  }, [menuActive])

  const handleSignInClick = useCallback(() => {
    setMenuActive(false)
    push('/authenticate')
  }, [push])

  return (
    <div className={styles.header}>
      <Link href="/" passHref={true}>
        <div className={styles.icon}>{logo}</div>
      </Link>
      <div className={styles.links}>
        <ThemeButton />
        {}
        <Link href="/link1">Link 1</Link>
        <Link href="/link2">Link 2</Link>
        {!pathname.match('/authenticate') && !user && (
          <Button label="Sign In" onClick={handleSignInClick} />
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
              <div className={styles.item} onClick={onMenuClick}>
                Test 1
              </div>
              <div className={styles.item} onClick={onMenuClick}>
                Test 2
              </div>
              {!pathname.match('/authenticate') && (
                <div className={styles.item} onClick={handleSignInClick}>
                  Sign In
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
