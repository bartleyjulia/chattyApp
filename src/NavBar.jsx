import React, {Component} from 'react';


// User count component
class Euphemism extends Component {

  render () {

// Array and function for assigning random euphemism for user count
      const synonyms = ['loudmouth', 'windbag', 'gasbag', 'prattler', 'yammerer', 'clatterfart', 'blabberer', 'chin-wagger', 'gossip', 'motormouth', 'mumbler', 'rando', 'whiner', 'confabulator', 'raconteur', 'conversationalist', 'glip glop' ,'babbler', 'blowhard', 'bigmouth', 'gabber', 'talking parrot', 'tattletale']
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

class NavBar extends Component {
  render(){
    return(
     <nav id='navbar' className="navbar">
        <a href="/" className="navbar-brand">Chatterbox</a>
        <Euphemism phraseIndex={this.props.usercount}/>
      </nav>
    );
  }
}
export default NavBar;