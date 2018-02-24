
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


// Function to simplify broadcasting from websocket
wss.broadcast = function broadcast(input){
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(input))
    }
  })
}
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  // Object that establishes usercount upon connection
  const userCountObject = {type: 'userCount', usercount: wss.clients.size};
  wss.broadcast(userCountObject);
  ws.on('error', function error(error) {
    console.log('error', error)
  })

  ws.on('message', function incoming(message) {
    message = JSON.parse(message);

    // Creates a unique ID for every message
    message['id'] = uuidv4();
    // Broadcasts messages, renaming type for clarification
    if (message.type === 'postMessage') {
      message['type'] = 'incomingMessage'
      wss.broadcast(message);
    } else if (message.type === 'postNotification') {
      message['type'] = 'incomingNotification'
      wss.broadcast(message);
    } else if (message.type === 'setColour') {
      // Array of colours to assign to user name, chosen by a random function
      let colours = ['cyan', 'purple', 'green', 'hotpink', 'orange']
      let colour = colours[Math.floor(Math.random() * colours.length)];
      message['userNameColour'] = colour;
      ws.send(JSON.stringify(message))
    }
  });
  ws.on('close', function close() {
    // Code that updates usercount when connections end
    const userCountObjectClose = {type: 'userCount', usercount: wss.clients.size};
    wss.broadcast(userCountObjectClose);
  });
});
