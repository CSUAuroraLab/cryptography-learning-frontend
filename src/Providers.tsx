import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export const Providers: React.FC = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)
