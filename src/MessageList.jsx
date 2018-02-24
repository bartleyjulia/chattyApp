import React, {Component} from 'react';

import Message from './Message.jsx';

import SystemMessage from './SystemMessage.jsx';

// Compiles user or system messages into list

class MessageList extends Component {

  render(){

    const messageListItems = this.props.messages.map((message) => {
      if (message.type === 'user') {
        return (
          <Message key={message.id} username={message.username} content={message.content} colour={message.userNameColour}/>
        );
      } else if (message.type === 'system') {
        return (
          <SystemMessage key={message.id} content={message.content}/>
        );
      }
    });

  return (

    <div className='messageListItems'>
    {messageListItems}
    </div>
    )
  }
}


export default MessageList;
