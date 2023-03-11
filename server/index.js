import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
})
app.use(cors())

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('message', (message) => {
    console.log(message)
    socket.broadcast.emit('message', {
      body: message,
      from: socket.id,
    })
  })
})

httpServer.listen(PORT, () => {
  console.log('Server running in port ' + PORT)
})
