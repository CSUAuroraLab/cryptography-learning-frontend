import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Page as Home } from './pages'
import { Page as Labs } from './pages/labs'
import { Page as learning } from './pages/learning'

export const App: React.FC = () => {
  return <>
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/labs' component={Labs}/>
        <Route path='/learning' component={learning}/>

        <Redirect to='/' />
      </Switch>
    </Router>
  </>
}

export default App
