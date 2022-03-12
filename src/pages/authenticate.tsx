/* eslint-disable @typescript-eslint/no-empty-function */
import type { NextPage } from 'next'

import { Button, TextField } from 'src/components'
import { useAuthenticate } from 'src/hooks'

import styles from 'src/styles/Authenticate.module.scss'

const Home: NextPage = () => {
  const {
    login,
    data,
    errors,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleReEnteredPasswordChange,
    handleToggleLoginClick,
    handleSignUp,
    handleSignIn,
  } = useAuthenticate()

  const loginFields = (
    <div className={styles.authenticate}>
      <h2>Login</h2>
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
      <div className={styles.buttons}>
        <Button label="Sign In" onClick={handleSignIn} />
        <Button
          label="Sign Up"
          variant="secondary"
          onClick={handleToggleLoginClick}
        />
      </div>
    </div>
  )

  const signUpFields = (
    <div className={styles.authenticate}>
      <h2>Sign Up</h2>
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
      <div className={styles.buttons}>
        <Button label="Sign Up" onClick={handleSignUp} />
        <Button
          label="Sign In"
          variant="secondary"
          onClick={handleToggleLoginClick}
        />
      </div>
    </div>
  )

  return (
    <div className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.login}>{login ? loginFields : signUpFields}</div>
        <div className={styles.content} />
      </div>
    </div>
  )
}

export default Home
