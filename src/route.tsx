
import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RoutePage } from 'components/LoadPage'

export const Routes: React.FC = () => {

  return <Suspense fallback={ <div>faild</div> }>
    <Switch>
      <RoutePage path='/' page={import('pages/index')}> 
        <Switch>
          <RoutePage exact path='/' page={import('pages/home')} /> 
          <RoutePage path='/labs' page={import('pages/labs')} /> 
          <RoutePage path='/learning' page={import('pages/learning')} /> 
          
          <Redirect to='/' />
        </Switch>
      </RoutePage>
    </Switch>
  </Suspense>
}