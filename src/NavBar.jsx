import React, {Component} from 'react';

class UserCountItem extends Component {
  render() {
    return (
      <div className="usercount">
      <a> User count = </a>
      <a>{this.props.usercount}</a>
      </div>
      )
  }
}

class NavBar extends Component {

  render(){



    return(

     <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <UserCountItem usercount={this.props.usercount}/>
      </nav>

      );
  }
}
export default NavBar;