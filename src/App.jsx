import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';

import NavBar from './NavBar.jsx';

import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
      usercount: 0,
      usercolour: 0
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
      console.log('Connected to websocket');
    this.socket.onopen = (event) => {
      // Sends out signal to websocket to set colour
    if (this.state.usercolour === 0){
      const newUserColourObject = {
        type: 'setColour',
      }
      this.socket.send(JSON.stringify(newUserColourObject))
    }
      console.log('Connection open on server')
    }

    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      switch (newMessage.type) {
        // Converts messages into system/ user message type
        case 'incomingMessage':
        newMessage.type = 'user'
        break;
        case 'incomingNotification':
        newMessage.type = 'system'
        break;
        case 'userCount':
        this.setState({usercount: newMessage.usercount});
        break;
        case 'setColour':
        // Sets specific user's state.usercolour
        this.setState({usercolour: newMessage.userNameColour})
      }
      const newMessages = this.state.messages.concat(newMessage);
      this.setState({
      messages: newMessages
      });
    }
  }

// Function for processing input from chat bar and sending it out to websocket
  newMessage(messageText, userName) {
    if (userName !== this.state.currentUser && userName !== '') {
      this.setState({currentUser: userName});
      const newUserNameObject = {
        type: 'postNotification',
        content: `${this.state.currentUser} has changed  their name to ${userName}`,
      }
      this.socket.send(JSON.stringify(newUserNameObject));
    }
    const newMessageObject = {
      type: 'postMessage',
      username: userName || this.state.currentUser,
      content: messageText,
      userNameColour: this.state.usercolour
    };
    this.socket.send(JSON.stringify(newMessageObject))
  }

  render() {
    return (
          <div>
      <NavBar usercount={this.state.usercount}/>
      <MessageList messages={this.state.messages} />
      <ChatBar newMessage={this.newMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;
