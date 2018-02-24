import React, {Component} from 'react';


// Individual message elements, username assigned class colour

class Message extends Component {
  render(){
    return(

     <div className="message">
     <span className={`${this.props.colour} message-username`} >{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
          </div>
      );
  }
}
export default Message;
