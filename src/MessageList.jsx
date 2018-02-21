import React, {Component} from 'react';


class MessageItem extends Component {
  render(){
           return (
          <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
          </div>
          )
  }
}

class SystemMessage extends Component {
  render () {
    return (
        <div className="message system">
          {this.props.content}
        </div>
    )
  }
}


class MessageList extends Component {

  render(){

    const messageListItems = this.props.messages.map((message) => {
            if (message.type === 'user') {
              return (
                <MessageItem key={message.id} username={message.username} content={message.content}/>
              );
            } else {
              return (
                <SystemMessage key={message.id} content={message.content}/>
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
