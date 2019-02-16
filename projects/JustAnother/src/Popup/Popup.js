import React from 'react';
import { inject, observer } from "mobx-react";
import styles from "./styles.js";

@inject("store")
@observer
class Popup extends React.Component{
  state = {
    character: this.props.character,
    id: this.props.character.id,
    name: this.props.character.name,
    description: this.props.character.description,
    edit: this.props.edit || false,
  }

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
          <img src={`./img/${this.state.id}.jpg`} alt={this.state.id}></img>
        </div>
      </styles.Popup>
    );
  }

  renderEdit = () => {
    return (
      <styles.Popup ref={this.refWrapPopup}>
        <span className="edit" onClick={this.edit}>
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
          <img src={`./img/${this.state.id}.jpg`} alt={this.state.id}></img>
        </div>
      </styles.Popup>
    );
  }

  refWrapPopup = (node) => {
    this.wrapPopup = node;
  }

  handleClick = (event) => {
    if (!this.wrapPopup.contains(event.target)) {
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
    this.props.store.saveChange(character.id, name, description);
    // character.name = name;
    // character.description = description;
  }

  handleChangeName = (event) => {
    const name = event.target.value;
    this.setState({
      name
    });
  }
  handleChangeDescription = (event) => {
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