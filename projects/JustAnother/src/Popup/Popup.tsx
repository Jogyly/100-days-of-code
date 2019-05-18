// import React, { Component } from "react";
import * as React from "react";
import { inject, observer } from "mobx-react";

import styles from "./styles.js";
import { ICharacter } from "../interfaces";
import Store from "../store";

interface IPopupState {
  character: ICharacter;
  id: number;
  name: string;
  description: string;
  edit: boolean;
}

interface IPopupProps {
  character: ICharacter;
  edit: boolean;
  changeShow: () => void;
}

interface InjectedProps extends IPopupProps {
  store: Store;
}

@inject("store")
@observer
class Popup extends React.Component<IPopupProps, IPopupState>{
  state = {
    character: this.props.character,
    id: this.props.character.id,
    name: this.props.character.name,
    description: this.props.character.description,
    edit: this.props.edit || false,
  }
  
  get injected() {
    return this.props as InjectedProps;
  }

  wrapPopup?: HTMLInputElement;

  componentDidMount = () => {
    document.addEventListener("click", this.handleClick);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClick);
    document.body.style.overflow = "";
  }

  renderCharacter = () => {
    return (
      <styles.Popup ref={this.refWrapPopup}>
        <span className="edit" onClick={this.handleEdit}>
          &Xi;
        </span>
        <span className="cross" onClick={this.props.changeShow}>
          &times;
        </span>
        <div className="name">
          { this.state.name }
        </div>
        <div className="description">
          { this.state.description }
        </div>
        <div className="img">
          <img src={`./img/${this.state.id}.jpg`} alt={this.state.id.toString()}></img>
        </div>
      </styles.Popup>
    );
  }

  renderEdit = () => {
    return (
      <styles.Popup ref={this.refWrapPopup}>
        <span className="edit" onClick={this.handleEdit}>
          &Xi;
        </span>
        <div className="actions">
          <button className="primary_button" onClick={this.saveChange}>Сохранить</button>
        </div>
        <span className="cross" onClick={this.props.changeShow}>
          &times;
        </span>
        <input
          className="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChangeName}
        />
        <textarea 
          value={ this.state.description }
          onChange={this.handleChangeDescription}
        />
        <div className="img">
          <img src={`./img/${this.state.id}.jpg`} alt={this.state.id.toString()}></img>
        </div>
      </styles.Popup>
    );
  }

  refWrapPopup = (node: HTMLInputElement) => {
    this.wrapPopup = node;
  }

  handleClick = (event: any) => {
    if (this.wrapPopup && !this.wrapPopup.contains(event.currentTarget)) {
      this.closePopup();
    }
  }

  closePopup = () => {
    const { name, description, character } = this.state;
    if (name !== character.name ||
      description !== character.description) {
        const result = window.confirm("Want to save?");
        if (result) {
          this.saveChange();
        }
      }
    this.props.changeShow();
  }

  saveChange = () => {
    const { character, name, description} = this.state;
    const { store } = this.injected;
    store.saveChange(character.id, name, description);
    // character.name = name;
    // character.description = description;
  }

  handleChangeName = (event: any) => {
    const name = event.target.value;
    this.setState({
      name
    });
  }

  handleChangeDescription = (event: any) => {
    const description = event.target.value;
    this.setState({
      description
    });
  }

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    })
  }

  render() {
    return (
      <React.Fragment>
      { this.state.edit 
          ? this.renderEdit()
          : this.renderCharacter()
      }
      </React.Fragment>
    );
  }
}

export default Popup;