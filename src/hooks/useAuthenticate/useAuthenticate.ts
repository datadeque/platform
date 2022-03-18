import { ApolloError } from '@apollo/client'
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AuthContext } from 'src/contexts'
import { useCreateUserMutation, useLoginUserMutation } from 'src/graphql/hooks'

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

const validateUsernameOrEmail = (user: string) => {
  if (user.match('@')) {
    return validateEmail(user)
  }
  return validateUsername(user)
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
  const [createUser] = useCreateUserMutation()

  const [formState, setFormState] = useState('login')
  const [data, setData] = useState({ ...initialState })
  const [errors, setErrors] = useState({ ...initialState })
  const [userError, setUserError] = useState('')
  const [loading, setLoading] = useState(false)

  const { refetch } = useContext(AuthContext)

  useEffect(() => {
    setErrors({ ...initialState })
  }, [formState])

  useEffect(() => {
    setUserError('')
  }, [data, formState])

  const validate = useCallback(() => {
    let newErrors = {
      ...initialState,
    }
    if (formState == 'login') {
      newErrors = {
        ...newErrors,
        username: validateUsernameOrEmail(data.username),
        password: validatePassword(data.password, data.password),
      }
    } else {
      newErrors = {
        ...newErrors,
        username: validateUsername(data.username),
        email: validateEmail(data.email),
        password: validatePassword(data.password, data.reEnteredPassword),
        reEnteredPassword: validateReEnteredPassword(
          data.password,
          data.reEnteredPassword
        ),
      }
    }
    setErrors(newErrors)
    return newErrors
  }, [data, formState])

  const handleToggleLoginClick = useCallback(() => {
    setFormState(formState == 'login' ? 'signUp' : 'login')
    setData({
      ...initialState,
    })
    setErrors({
      ...initialState,
    })
  }, [formState])

  const handleSignUp = useCallback(async () => {
    const errors = validate()
    if (Object.values(errors).join('').length === 0) {
      try {
        setLoading(true)
        await createUser({
          variables: {
            createUserInput: {
              email: data.email,
              username: data.username,
              password: data.password,
            },
          },
        })
        refetch()
      } catch (err) {
        setUserError((err as ApolloError).message)
      }
      setLoading(false)
    }
  }, [validate, data, createUser, refetch])

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
        const password = data.password
        setLoading(true)
        setData({ ...data, password: '' })
        await loginUser({
          variables: {
            loginUserInput: {
              email,
              username,
              password,
            },
          },
        })
        refetch()
      } catch (err) {
        setUserError((err as ApolloError).message)
      }
      setLoading(false)
    }
  }, [validate, data, loginUser, refetch])

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
  }
}
