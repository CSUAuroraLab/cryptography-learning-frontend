import React, { useCallback, useState, useEffect } from 'react'
import { QueryResult, OperationVariables, ApolloError } from '@apollo/client'
import { Loading } from 'components/Loading'
import { ShowError } from 'components/Error'

// Add pollInterval to useQuery options when stop polling is need
export const useApolloData = <TData, TVariables extends OperationVariables>(
  res: QueryResult<TData, TVariables>,
  render: (data: TData) => React.ReactElement,
  renderError?: (error: ApolloError) => React.ReactElement,
  stopPollingWhen?: (data: TData) => boolean
): React.ReactElement => {
  const { data, error, loading, refetch, called, stopPolling } = res
  const onRefetch = useCallback(() => refetch(), [ refetch ])
  useEffect(() => {
    if (stopPollingWhen && data && stopPollingWhen(data)) {
      stopPolling()
    }
  }, [data, stopPollingWhen, stopPolling])
  if (!called) {
    return React.createElement(React.Fragment)
  }
  if (loading) {
    return React.createElement(Loading)
  }
  if (error) {
    if (renderError) {
      return renderError(error)
    } else {
      return React.createElement(
        ShowError,
        {
          error,
          onRefetch
        }
      )
    }
  }
  if (!data) {
    throw new Error()
  }
  return render(data)
}

export const useToggle = (defaultValue: boolean) => {
  const [ value, setValue ] = useState(defaultValue)
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return [ value, setTrue, setFalse ] as const
}
  