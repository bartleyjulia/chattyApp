import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';

import Messages from './Message.jsx';

import NavBar from './NavBar.jsx';

import MessageList from './MessageList.jsx';



class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Bob',
      messages: [],
      usercount: 0,
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
      console.log('connected to websocket');
    this.socket.onopen = (event) => {
      console.log('Connection open on server')
    }
    this.socket.onmessage = (event) => {
      // console.log('event', event.data);
      let newMessage = JSON.parse(event.data);
      switch (newMessage.type) {
        case 'incomingMessage':
        newMessage.type = 'user'
        break;
        case 'incomingNotification':
        newMessage.type = 'system'
        break;
        case 'userCount':
        this.setState({usercount: newMessage.usercount});
        break;
      }
      const newMessages = this.state.messages.concat(newMessage);
      this.setState({
      messages: newMessages
      });
    }
  }

  // newUserName(oldUsername, newUserName) => {
  //   //// function for sending post notification to web socket
  //     newUserName(this.state.currentUser, userName);
  // };

  newMessage(messageText, userName) {
    if (userName !== this.state.currentUser && userName !== '') {
      this.setState({currentUser: userName});
      const newUserNameObject = {
        type: 'postNotification',
        content: `${this.state.currentUser} has changed  their name to ${userName}`
      }
      this.socket.send(JSON.stringify(newUserNameObject));
    }
    const newMessageObject = {
      type: 'postMessage',
      username: userName ? userName : this.state.currentUser,
      content: messageText
    };
    console.log('message on client side', newMessageObject);
    this.socket.send(JSON.stringify(newMessageObject))
  }


  render() {
    return (
          <div>
      <NavBar usercount={this.state.usercount}/>
      <Messages/>
      <MessageList messages={this.state.messages} />
      <ChatBar newMessage={this.newMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;
