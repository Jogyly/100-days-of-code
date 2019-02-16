import React from 'react';
import "./Node.css"; 
import Popup from "../Popup/Popup.js"
import { observer } from "mobx-react" 
import styles from "./styles.js";

@observer
class Node extends React.Component{
  state = {
    showPopup: this.props.showPopup || false,
    character: this.props.character,
    active: this.props.active || false,
    childActive: false,
  }

  addCharacter = () => {
    const id = this.props.store.getNewId();
    console.log(`new id = ${id}`);
    const newCharacter = {
      id,
      name: "new",
      description: "sdf",
      children: [],
    }
    
    this.props.store.addCharacter(this.props.character.id, newCharacter);
  }

  showParents = () => {
    
  }

  changeShow = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  refNode = (node) => {
    this.node = node;
  }

  handleClick = (event) => {
    if (!this.node.contains(event.target)) {
      this.makeDisActive();
    }
  }

  subscribe = () => {
    document.addEventListener("click", this.handleClick);
  }

  unsubscribe = () => {
    document.removeEventListener("click", this.handleClick);
  }

  makeDisActive = () => {
    this.unsubscribe();
    this.setState({
      active: false,
    });
  }

  makeActive = () => {
    this.subscribe();
    this.showParents();
    this.setState({
      active: true,
    });
  }

  render() {
    const { active, character } = this.state;
    return (
      <div>
        <styles.Node 
          ref={this.refNode}
          active={active} 
          onClick={active ? this.changeShow : this.makeActive}
        >
          { character.name }
        </styles.Node>
        <styles.Button active={active} onClick={this.addCharacter}>
          +
        </styles.Button>
        {
          this.state.showPopup && 
            <Popup
              character={character}
              changeShow={this.changeShow}
              edit={!!character.new}
            />
        }
      </div>
    );
  }
}

export default Node;