import React, {Component} from 'react';


class Message extends Component {


  handleMessage() {
// console.log(' in message.jsx', this.props.colour)
    switch (this.props.colour){
      case 'cyan':
        return (<span className="message-username cyan">{this.props.username}</span>)
      case 'orange':
        return (<span className="message-username orange">{this.props.username}</span>);
      case 'purple':
        return (<span className="message-username purple">{this.props.username}</span>)
      case 'hotpink':
        return (<span className="message-username hotpink">{this.props.username}</span>)
      case 'green':
        return (<span className="message-username green">{this.props.username}</span>)
      default:
        return (<span className="message-username">{this.props.username}</span>)
    }
  }

  render(){
    return(

     <div className="message">
          {this.handleMessage()}
          <span className="message-content">{this.props.content}</span>
          </div>

      );
  }
}
export default Message;
