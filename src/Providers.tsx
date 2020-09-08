import React from 'react'
import i18n from './i18n'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

export const Providers: React.FC = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
</I18nextProvider>
)
