import React, { useState, useEffect, useRef } from 'react'
import { Loading } from './Loading'
import { Route, RouteProps } from 'react-router-dom'
import { useError } from './Error'

type LoadPageProps = {
  page: Promise<{ Page: React.FC }>
}

export const LoadPage: React.FC<LoadPageProps> = ({ page, children }) => {
  const [ Cur, setCur ] = useState<React.FC>(() => Loading)
  const [ error, { setError } ] = useError()
  const unmount = useRef<boolean>()

  useEffect(() => {
    setCur(() => Loading)
    unmount.current = false
    return () => { unmount.current = true }
  }, [page])
  page.then(({ Page }) => {
    if (unmount.current) return
    setCur(() => Page)
  }, e => {
    if (unmount.current) return
    setError(e)
  })

  return error || <Cur>
    { children }
  </Cur>
}

const getKey = (path: string | string[] | undefined) => {
  if (Array.isArray(path)) {
    return path.join(',')
  } else {
    return path
  }
}

export const RoutePage: React.FC<RouteProps & LoadPageProps> = ({ page, children, ...rest}) => {
  return <Route {...rest}><LoadPage key={getKey(rest.path)} page={page}>{children}</LoadPage></Route>
}
