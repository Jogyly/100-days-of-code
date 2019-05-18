import * as React from "react";
import "./Node.css"; 
import Popup from "../Popup/Popup";
import { observer } from "mobx-react";
import styles from "./styles.js";
import { ICharacter } from "../interfaces";
import Store from "../store/store";

interface INodeState {
  showPopup: boolean;
  character: ICharacter;
  active?: boolean;
  childActive?: boolean;
}

interface INodeProps extends INodeState {
  store: Store;
}

@observer
class Node extends React.Component<INodeProps, INodeState>{
  state = {
    showPopup: this.props.showPopup || false,
    character: this.props.character,
    active: this.props.active || false,
    childActive: false,
  }

  node: HTMLInputElement | null = null;

  addCharacter = () => {
    const id = this.props.store.getNewId();
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