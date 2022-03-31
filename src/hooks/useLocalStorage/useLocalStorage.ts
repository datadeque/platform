import { useCallback, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (arg0: T) => void] => {
  const isClient = typeof window !== 'undefined'
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  const initialize = useCallback(() => {
    try {
      const item = isClient ? window?.localStorage?.getItem(key) : null
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      return initialValue
    }
  }, [initialValue, isClient, key])

  useEffect(() => {
    setStoredValue(initialize())
  }, [initialize])

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (isClient)
        window?.localStorage?.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }
  return [storedValue, setValue]
}
