const path = require('path')
const http = require('http')
// Create an Express web server
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
// Set up a new Express server
const app = express()
const server = http.createServer(app)
// Set up support for socket.io
const io = socketio(server)

//    -Listen on port 3000
const port = process.env.PORT || 3000
//    -Serve up the public directory
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message, callback) => {
          const filter = new Filter()

          if (filter.isProfane(message)) {
              return callback('Profanity is not allowed!')
          }

          io.emit('message', message)
          callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
