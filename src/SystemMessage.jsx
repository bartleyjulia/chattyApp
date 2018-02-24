import React, {Component} from 'react';

// System message elements
class SystemMessage extends Component {
  render () {
    return (
        <div className="message system">
          {this.props.content}
        </div>
    )
  }
}

export default SystemMessage;