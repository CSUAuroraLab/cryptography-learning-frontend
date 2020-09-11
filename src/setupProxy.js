const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports =  app => {
  const url = 'localhost:4000'
  app.use(createProxyMiddleware('/query', {target: `http://${url}`, ws: true}))
}