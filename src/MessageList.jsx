import React, {Component} from 'react';

import Message from './Message.jsx';

import SystemMessage from './SystemMessage.jsx';


class MessageList extends Component {

  render(){

    const messageListItems = this.props.messages.map((message) => {
            if (message.type === 'user') {
              return (
                <div>
                <Message key={message.id} username={message.username} content={message.content}/>
              </div>
              );
            } else {
              return (
                <div>
                <SystemMessage key={message.id} content={message.content}/>
                </div>
              );

            }

    });

  return (
      <div>
      {messageListItems}
      </div>
      )
  }
}




export default MessageList;
