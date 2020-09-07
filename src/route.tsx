
import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Page as Home } from './pages'
import { Page as Labs } from './pages/labs'
import { Page as learning } from './pages/learning'

export const Routes: React.FC = () => {

  return <Suspense fallback={ <div>faild</div> }>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/labs' component={Labs}/>
      <Route path='/learning' component={learning}/>

      <Redirect to='/' />
    </Switch>
  </Suspense>
}