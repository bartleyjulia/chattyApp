// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;
// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(input){
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(input))
    }
  })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  console.log(wss.clients);
  const userCountObject = {type: 'userCount', usercount: wss.clients.size};
  wss.broadcast(userCountObject);
  ws.on('error', function error(error) {
    console.log('error', error)
  })

  ws.on('message', function incoming(message) {
    message = JSON.parse(message);
    console.log(message.type);
    if (message.type === 'postMessage') {
      message['type'] = 'incomingMessage'
    } else if (message.type === 'postNotification') {
      message['type'] = 'incomingNotification'
    }
    let uniqueID = uuidv4();
    message['id'] = uniqueID;
    if (!message.userNameColour) {
      let colours = ['cyan', 'purple', 'green', 'hotpink', 'orange']
      let colour = colours[Math.floor(Math.random() * colours.length)];
      message['userNameColour'] = colour;
      console.log(message.userNameColour)
    }

    // let colours = ['cyan', 'purple']
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message))
      }
    })
  })
  ws.on('close', function close() {
    const userCountObjectClose = {type: 'userCount', usercount: wss.clients.size};
    wss.broadcast(userCountObjectClose);
  });
});
