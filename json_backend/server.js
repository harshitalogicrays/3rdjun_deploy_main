import jsonServer from 'json-server'
import path from 'path'
import cors from 'cors'

const server = jsonServer.create()
const __dirname = path.resolve()
const router = jsonServer.router((path.join(__dirname, 'data.json')));
const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(cors())
server.use(router)
let PORT = 3000
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})