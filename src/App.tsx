import React from 'react'
import './App.css'
import 'i18n'
import { Providers } from 'Providers'
import { Routes } from 'route'

export const App: React.FC = () => {
  return <>
    <Providers>
      <div className='app'>
        <Routes></Routes>
      </div>
    </Providers>
  </>
}

export default App
