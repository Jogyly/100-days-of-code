import React from 'react';
import style from "./Node.css"; 
import Popup from "../Popup/Popup.js"

class Node extends React.Component{
  state = {
    name: this.props.name,
    showPopup: false,
    character: this.props.character,
  }

  addCharacter = () => {
    
  }

  changeShow = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <div className="commonNode">
        <div className="node" onClick={this.changeShow}>
          { this.state.character.name }
        </div>
        <button className="but" onClick={this.addCharacter}>+</button>
        {
          this.state.showPopup && 
            <Popup character={this.state.character} changeShow={this.changeShow}/>
        }
      </div>
    );
  }
}

export default Node;