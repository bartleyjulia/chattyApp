import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';

import Messages from './Message.jsx';

import NavBar from './NavBar.jsx';

import MessageList from './MessageList.jsx';

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { id: 1,
          type: 'user',
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        { id: 2,
          type: 'user',
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        },
        { id: 3,
          type: 'system',
          content: "No fighting you two"
        }
      ]
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    console.log('connected to websocket');
  }

  newMessage(messageText, userName) {
    const newMessageObject = {
      id: Math.random(),
      type: 'user',
      username: userName,
      content: messageText
    };
    console.log(newMessageObject);
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    });

  }

  render() {
    return (
          <div>
      <NavBar/>
      <Messages/>
      <MessageList messages={this.state.messages} />
      <ChatBar newMessage={this.newMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;
