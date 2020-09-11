import React from 'react'
import i18n from './i18n'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { HyperLink } from 'utils/hyperLink'

const ENDPOINT = '/query'

const createWsClient = (endpoint: string) => {
  const WsProtocol = window.location.protocol.replace('http', 'ws')
  const client = new SubscriptionClient(`${WsProtocol}//${window.location.host}${endpoint}`, {
    reconnect: true,
    lazy: true,
    connectionCallback: function () {
      // TODO: remove this workaround
      // WORKAROUND: prevent infinite reconnection (https://github.com/99designs/gqlgen/issues/745)
      (this as any).wasKeepAliveReceived = true
    },
  })
  return client
}

function getLink() {
  const ws = createWsClient(ENDPOINT)
  const http = createHttpLink({ uri: ENDPOINT })
  const link = new HyperLink(ws, http)
  return link
}

const ApolloClientProvider: React.FC = ({ children }) => {
  const client = new ApolloClient({
    link: getLink(),
    cache: new InMemoryCache(),
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export const Providers: React.FC = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <ApolloClientProvider>
        {children}
      </ApolloClientProvider>
    </BrowserRouter>
  </I18nextProvider>
)
