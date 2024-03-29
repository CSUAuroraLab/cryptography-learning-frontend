
import React, { Suspense } from 'react'
import { Switch, Redirect, generatePath } from 'react-router-dom'
import { RoutePage } from 'components/LoadPage'

export enum Pattern {
  Lab = '/practice/:category/:lab'
}

export type ParamType = {
  [Pattern.Lab]: {
    category: string
    lab: string
  }
}

export function generateLink<T extends keyof ParamType>(pattern: T, params?: ParamType[T]) {
  try {
    console.log(pattern)
    return generatePath(pattern, params)
  } catch (e) {
    console.error(e)
    return '/'
  }
}

export const Routes: React.FC = () => {
  return <Suspense fallback={ <div>faild</div> }>
    <Switch>
      <RoutePage path='/' page={import('pages/index')}> 
        <Switch>
          <RoutePage exact path='/tutorial' page={import('pages/tutorial')} /> 
          <RoutePage exact path={Pattern.Lab} page={import('pages/practice')} />
          <RoutePage path='/practice' page={import('pages/practice')} /> 
          <RoutePage path='/learning' page={import('pages/learning')} /> 
          <RoutePage path='/feedback' page={import('pages/feedback')} />
          <RoutePage exact path='/' page={import('pages/home')} />
          <Redirect to='/' />
        </Switch>
      </RoutePage>
    </Switch>
  </Suspense>
}