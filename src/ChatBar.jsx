import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      userName: ''
    };
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value})
  }

  onUserTextChange(event) {
    this.setState({userName: event.target.value})
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageText, this.state.userName);
      this.setState({messageText: ''})
    }
  }

  render(){
    return(
        <footer className="chatbar">
        <input
        value={this.state.userName}
        onChange={this.onUserTextChange.bind(this)}
        className="chatbar-username" placeholder="Your Name (Optional)"
        onKeyPress={this.onMessageKeyPress.bind(this)}/>




        <input
        value={this.state.messageText}
        onChange={this.onMessageTextChange.bind(this)}
        className="chatbar-message"
        placeholder="Type a message and hit ENTER" onKeyPress={this.onMessageKeyPress.bind(this)} />
      </footer>
      );
  }
}

export default ChatBar;