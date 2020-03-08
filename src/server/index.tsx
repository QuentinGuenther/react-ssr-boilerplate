import * as express from "express"
import * as cors from "cors"
import * as React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import * as serialize from "serialize-javascript"
import App from '../shared/App'
import Home from '../shared/Home'
import routes from '../shared/routes'

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, {
    path: route.path,
    exact: route.exact,
  }))

  const promise = activeRoute && activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data: any[]) => {
    const markup = renderToString(
      <StaticRouter location={req.url} >
        <App data={data} />
      </StaticRouter>
    )
    res.send(generateHTML(markup, data));
  }).catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

const generateHTML = (markup: string, data = {}) => {
  return(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>`
  );
}
