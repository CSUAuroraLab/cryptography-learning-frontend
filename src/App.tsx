import React from 'react'
import './App.css'
import { Providers } from 'Providers'
import { Routes } from 'route'
import styled from '@emotion/styled/macro'

const Div = styled.div`
  height: 100%;
`

export const App: React.FC = () => {
  return <>
    <Providers>
      <Div className='app'>
        <Routes></Routes>
      </Div>
    </Providers>
  </>
}

export default App
