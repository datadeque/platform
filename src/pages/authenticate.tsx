/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import type { NextPage } from 'next'
import { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { Button, TextField } from 'src/components'
import { AuthContext } from 'src/contexts'
import { useAuthenticate } from 'src/hooks'

import styles from 'src/styles/Authenticate.module.scss'

const Authenticate: NextPage = () => {
  const {
    formState,
    data,
    errors,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleReEnteredPasswordChange,
    handleToggleLoginClick,
    handleSignUp,
    handleSignIn,
    userError,
    loading,
  } = useAuthenticate()
  const { push } = useRouter()
  const userErrorRef = useRef<HTMLDivElement | null>(null)
  const { loading: contextLoading, user } = useContext(AuthContext)

  if (user) push('/projects')

  useEffect(() => {
    if (userErrorRef.current) userErrorRef.current.textContent = userError
  }, [userError])

  const loginFields = (
    <div className={styles.authenticate}>
      <h2>Login</h2>
      <div className={styles.error} ref={userErrorRef} />
      <div className={styles.fields}>
        <TextField
          label="Username or Email"
          value={data.username}
          onChange={handleUsernameChange}
          variant="outlined"
          error={errors?.username}
        />
        <TextField
          label="Password"
          value={data.password}
          onChange={handlePasswordChange}
          variant="outlined"
          type="password"
          error={errors?.password}
        />
      </div>
      <Button
        label="Sign In"
        onClick={handleSignIn}
        loading={loading || contextLoading}
      />
      <div className={styles.account}>
        Don&apos;t have an account?
        <span onClick={handleToggleLoginClick}>Sign up</span>
      </div>
    </div>
  )

  const signUpFields = (
    <div className={styles.authenticate}>
      <h2>Sign Up</h2>
      <div className={styles.error} ref={userErrorRef} />
      <div className={styles.fields}>
        <TextField
          label="Username"
          value={data.username}
          onChange={handleUsernameChange}
          variant="outlined"
          error={errors?.username}
        />
        <TextField
          label="Email"
          value={data.email}
          onChange={handleEmailChange}
          variant="outlined"
          error={errors?.email}
        />
        <TextField
          label="Password"
          value={data.password}
          onChange={handlePasswordChange}
          variant="outlined"
          type="password"
          error={errors?.password}
        />
        <TextField
          label="Re-enter Password"
          value={data.reEnteredPassword}
          onChange={handleReEnteredPasswordChange}
          variant="outlined"
          type="password"
          error={errors?.reEnteredPassword}
        />
      </div>
      <Button label="Sign Up" onClick={handleSignUp} />
      <div className={styles.account}>
        Already have an account?
        <span onClick={handleToggleLoginClick}>Login</span>
      </div>
    </div>
  )

  return (
    <div className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.login}>
          {formState == 'login' ? loginFields : signUpFields}
        </div>
        <div className={styles.content} />
      </div>
    </div>
  )
}

export default Authenticate
