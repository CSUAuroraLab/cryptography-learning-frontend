import { useCallback, useState } from 'react'

export const useToggle = (defaultValue: boolean) => {
  const [ value, setValue ] = useState(defaultValue)
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return [ value, setTrue, setFalse ] as const
}
  