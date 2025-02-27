import express, { Express } from 'express'
import { telefunc } from 'telefunc'

startServer()

async function startServer() {
  const app = express()
  installTelefunc(app)
  await installFrontend(app)
  start(app)
}

function start(app: Express) {
  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

function installTelefunc(app: Express) {
  app.use(express.text())
  app.all('/_telefunc', async (req, res) => {
    const { originalUrl: url, method, body } = req
    const httpResponse = await telefunc({ url, method, body })
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })
}

async function installFrontend(app: Express) {
  if (process.env.NODE_ENV === 'production') {
    const root = __dirname 
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevServer = await vite.createServer({
      server: { middlewareMode: 'html' },
    })
    app.use(viteDevServer.middlewares)
  }
}
