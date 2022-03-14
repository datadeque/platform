import { ApolloError } from '@apollo/client'
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AuthContext } from 'src/contexts'
import { useLoginUserMutation } from 'src/graphql/hooks'

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
  const [loginUser] = useLoginUserMutation()

  // TODO: rename to something better
  const [login, setLogin] = useState(true)
  const [data, setData] = useState({ ...initialState })
  const [errors, setErrors] = useState({ ...initialState })

  const { refetch } = useContext(AuthContext)

  useEffect(() => {
    setErrors({ ...initialState })
  }, [login])

  // TODO: validate logic should depend on page state
  const validate = useCallback(() => {
    const newErrors = {
      ...initialState,
      username: validateUsername(data.username),
      email: login ? '' : validateEmail(data.email),
      password: validatePassword(
        data.password,
        login ? data.password : data.reEnteredPassword
      ),
      reEnteredPassword: validateReEnteredPassword(
        data.password,
        login ? data.password : data.reEnteredPassword
      ),
    }
    setErrors(newErrors)
    return newErrors
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

  const handleSignIn = useCallback(async () => {
    const errors = validate()
    if (Object.values(errors).join('').length === 0) {
      let email, username
      if (data.username.indexOf('@') !== -1) {
        email = data.username
      } else {
        username = data.username
      }
      try {
        await loginUser({
          variables: {
            loginUserInput: {
              email,
              username,
              password: data.password,
            },
          },
        })
        refetch()
      } catch (err) {
        // TODO: remove log, display the error to user
        console.error((err as ApolloError).message)
      }
    }
  }, [data.password, data.username, loginUser, refetch, validate])

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
