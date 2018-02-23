import React, {Component} from 'react';




class Euphemism extends Component {


  render () {


      const synonyms = ['loudmouth', 'windbag', 'gasbag', 'prattler', 'yammerer', 'clatterfart', 'blabberer', 'chin-wagger', 'gossip', 'motormouth', 'mumbler', 'confabulator', 'raconteur', 'conversationalist', 'babbler', 'blowhard', 'bigmouth', 'gabber', 'talking parrot', 'tattletale']
      const randomEuphemism = synonyms[Math.floor(Math.random() * synonyms.length)];

      if (this.props.phraseIndex === 1) {
        return (
          <div className="euphemism">
        <a>There is {this.props.phraseIndex} lonely {randomEuphemism} online right now. </a>
        </div>
        )
      } else {
        return (
          <div className="euphemism">
          <a>There are {this.props.phraseIndex} {randomEuphemism}s online right now.</a>
          </div>
          )
      }
  }
}


class UserCountItem extends Component {
      // switch (this.props.usercount.value())

  render() {
    return (
      <div className="user-count">
      <a>{this.props.usercount}</a>
      </div>
      )
  }
}

class NavBar extends Component {


  render(){

    console.log('user count in nav bar component', this.props.usercount);

    return(
     <nav id='navbar' className="navbar">
        <a href="/" className="navbar-brand">Chatterbox</a>
        <Euphemism phraseIndex={this.props.usercount}/>
      </nav>

      );
  }
}
export default NavBar;