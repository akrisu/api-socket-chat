const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const http = require('http')
const readline = require('readline')
const socketIo = require('socket.io')

const app = express()
const dataFileName = 'data.txt'
const port = 4001
const server = http.createServer(app)
const io = socketIo(server)
const router = express.Router();

app.use(bodyParser.json())
app.use(router)


const handleReceivedMessage = (payload, clientId) => {
  fs.appendFile(dataFileName, JSON.stringify({ ...payload, clientId }) + `\r\n`, () => {
    io.sockets.emit('message', JSON.stringify({ ...payload, clientId }))
  })
}


io.on('connection', socket => {
  const rl = readline.createInterface({
    input: fs.createReadStream(dataFileName),
    crlfDelay: Infinity
  })
  const clientId = socket.client.id

  io.to(clientId).emit('clientId', clientId)

  rl.on('line', line => {
    io.to(clientId).emit('message', line)
  })

  socket.on('message', payload => handleReceivedMessage(payload, clientId))
});


router.post('/message', (req, res) => {
  const { body } = req
  const { clientId, ...rest} = body
  handleReceivedMessage(rest, clientId)

  res.send().status(200)
})

server.listen(port, () => console.log(`Listening on port ${port}`));
