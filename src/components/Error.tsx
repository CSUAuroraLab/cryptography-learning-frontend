import React, { useEffect, useCallback, Fragment, useState } from 'react'
import { Alert } from '@blueprintjs/core'
import { useToggle } from 'hooks/common'
import { isApolloError } from '@apollo/client'

enum Errors {
  CriticalErrorHappened = 'CRITICAL_ERROR_HAPPENED',
}

export type ErrorType = Error | string | undefined
export type ErrorContext = Record<string, string>

export const useError = (errContext?: ErrorContext) => {
  const [ error, setError ] = useState<ErrorType>(undefined)
  const clearError = useCallback(() => setError(undefined), [])
  const checkError = function <T extends (...args: any[]) => Promise<void> | void>(callback: T): T {
    return (async (...args: any[]) => {
      try {
        await callback(...args)
      } catch (e) {
        setError(e)
      }
    }) as any
  }
  return [error && <ShowError errContext={errContext} error={error}></ShowError>, { setError, clearError, checkError }] as const
}

export function useErrorToDescription() {
  return useCallback((error: ErrorType, errContext: ErrorContext): React.ReactNode => {
    let description: React.ReactNode = ''
    if (typeof error === 'undefined') {
      return <></>
    } else if (typeof error === 'string') {
      description = error
    } else if (isApolloError(error)) {
      if (error.graphQLErrors.length > 0) {
        description = error.graphQLErrors.map(e => {
          if (e.extensions?.code === Errors.CriticalErrorHappened) {
            return undefined
          }
          if (e.extensions?.code) {
            console.log('errContext', errContext, e.extensions?.code)
            return 'error-' + e.extensions.code
          }
          // internal error
          return 'error-internal'
        }).map((i, id) => <Fragment key={id}>{i}</Fragment>)
      } else if (error.networkError) {
        const resp: Response | undefined = (error.networkError as any)?.response
        // invalid token
        if (resp?.status === 401) {
          description = 'invalid-token'
        } else {
          description = 'error-networkError'
        }
      }
    } else {
      console.warn('unknown error', error)
      description = 'error-unknown'
    }
    return description
  }, [])
}

export const ShowError: React.FC<{
  noBorder?: boolean
  error?: ErrorType
  errContext?: ErrorContext
}> = ({ noBorder, error, errContext }) => {
  const [ visible, setVisible, resetVisible ] = useToggle(false)
  const getDescription = useErrorToDescription()
  useEffect(() => {
    if (error) {
      setVisible()
    }
  }, [ error, setVisible ])
  const err = <span className='on-error' data-testid='show-error'>
    { getDescription(error, errContext ?? {}) }
  </span>

  return noBorder ? err : <Alert
    isOpen={visible}
    onClose={resetVisible}
  >
    { err }
  </Alert>
}
