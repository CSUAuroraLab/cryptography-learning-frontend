import { createProxyMiddleware } from 'http-proxy-middleware'

export default app => {
  const url = 'localhost:4000'
  app.use(createProxyMiddleware('/query', {target: `http://${url}`, ws: true}))
}