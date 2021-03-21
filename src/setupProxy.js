// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports =  app => {
  const url = 'localhost:8000'
  app.use(createProxyMiddleware('/query', {target: `http://${url}`, ws: true}))
  app.use(createProxyMiddleware('/static/img', {target: `http://${url}`, ws: true}))
}