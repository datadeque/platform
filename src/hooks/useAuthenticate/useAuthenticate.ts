import { ChangeEvent, useCallback, useState } from 'react'

const initialState = {
  username: '',
  email: '',
  password: '',
  reEnteredPassword: '',
}

const validateUsername = (username: string) => {
  if (username.length < 8) return 'Username must have 8 or more characters'
  if (!username.match('^[a-zA-Z0-9_]+$'))
    return 'Username must only have alpha-numeric characters or _'
  return ''
}

const validateEmail = (email: string) => {
  if (email.length == 0) return 'Email cannot be empty'
  if (!email.match('@')) return 'Email must include @'
  return ''
}

const validatePassword = (password: string, reEnteredPassword: string) => {
  if (password != reEnteredPassword) return 'Passwords must match'
  if (password.length < 8) return 'Password must have 8 or more characters'
  if (!password.match('(?=.*[!@#$%^&*])'))
    return 'Password must have at least one special character'
  return ''
}

const validateReEnteredPassword = (
  password: string,
  reEnteredPassword: string
) => {
  if (password != reEnteredPassword) return 'Passwords must match'
  if (reEnteredPassword.length == 0)
    return 'Re-entered password cannot be empty'
  if (password.length < 8) return 'Password must have 8 or more characters'
  if (!password.match('(?=.*[!@#$%^&*])'))
    return 'Password must have at least one special character'
  return ''
}

export const useAuthenticate = () => {
  const [login, setLogin] = useState(true)

  const [data, setData] = useState({ ...initialState })

  const [errors, setErrors] = useState({ ...initialState })

  const validate = useCallback(() => {
    setErrors({
      ...initialState,
      username: validateUsername(data.username),
      email: validateEmail(data.email),
      password: validatePassword(
        data.password,
        login ? data.password : data.reEnteredPassword
      ),
      reEnteredPassword: validateReEnteredPassword(
        data.password,
        data.reEnteredPassword
      ),
    })
  }, [data, login])

  const handleToggleLoginClick = useCallback(() => {
    setLogin(!login)
    setData({
      ...initialState,
    })
    setErrors({
      ...initialState,
    })
  }, [login])

  const handleSignUp = () => {
    validate()
  }

  const handleSignIn = () => {
    validate()
  }

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        username: e.target.value,
      })
      setErrors({
        ...errors,
        username: '',
      })
    },
    [data, errors]
  )
  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        email: e.target.value,
      })
      setErrors({
        ...errors,
        email: '',
      })
    },
    [data, errors]
  )

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        password: e.target.value,
      })
      setErrors({
        ...errors,
        password: '',
        reEnteredPassword: '',
      })
    },
    [data, errors]
  )

  const handleReEnteredPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        reEnteredPassword: e.target.value,
      })
      setErrors({
        ...errors,
        password: '',
        reEnteredPassword: '',
      })
    },
    [data, errors]
  )

  return {
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
  }
}
