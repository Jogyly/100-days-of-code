import * as React from "react";
import { observer } from "mobx-react";

import Popup from "../Popup/Popup";

import styles from "./styles";

import { ICharacter } from "../interfaces";
import Store from "../store/store";

interface INodeState {
  showPopup: boolean;
  active?: boolean;
  childActive?: boolean;
}

interface INodeProps extends INodeState {
  character: ICharacter;
  store: Store;
}

@observer
class Node extends React.Component<INodeProps, INodeState>{
  state = {
    showPopup: this.props.showPopup || false,
    active: this.props.active || false,
    childActive: false,
  }

  node?: HTMLInputElement;

  addCharacter = () => {
    const id = this.props.store.getNewId();
    const newCharacter = {
      id,
      name: "new",
      description: "sdf",
      children: [],
      parent: this.props.character.id,
    }
    
    this.props.store.addCharacter(this.props.character.id, newCharacter);
  }

  deleteCharacter = () => {
    const { id, parent, children} = this.props.character;
    this.props.store.deleteCharacter(id, parent, children);
  }

  showParents = () => {
    
  }

  changeShow = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  refNode = (node: HTMLInputElement) => {
    this.node = node;
  }

  handleClick = (event: any) => {
    if (this.node && !this.node.contains(event.target)) {
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
    const { active } = this.state;
    const { character } = this.props;

    return (
      <div>
        <styles.Node 
          ref={this.refNode}
          active={active} 
          onClick={active ? this.changeShow : this.makeActive}
        >
          { character.name }
        </styles.Node>

        <styles.Button
          className="add"
          active={active}
          onClick={this.addCharacter}
        >
          +
        </styles.Button>

        <styles.Button
          className="delete"
          active={active}
          onClick={this.deleteCharacter}
        >
          -
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