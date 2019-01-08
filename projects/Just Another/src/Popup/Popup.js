import React from 'react';
import style from "./Popup.css"; 
import { inject } from "mobx-react";

class Popup extends React.Component{
  state = {
    character: this.props.character,
    id: this.props.character.id,
    name: this.props.character.name,
    description: this.props.character.description,
    oldCharacter: null,
    edit: false,
  }

  componentDidMount = () => {
    document.addEventListener("click", this.handleClick);
    const oldCharacter = new Object();
    oldCharacter.id = this.state.id;
    oldCharacter.name = this.state.name;
    oldCharacter.description = this.state.description;
    this.setState({
      oldCharacter
    });
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClick);
    console.dir(this.state.oldCharacter);
    this.setState({
      character: this.state.oldCharacter
    });
    console.log("willRem");
    console.dir(this.state.character);
  }

  renderCharacter = () => {
    return (
      <div className="popup" ref={this.refWrapPopup}>
        <span className="edit" onClick={this.edit}>
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
      </div>
    );
  }

  renderEdit = () => {
    let name = this.state.name;
    return (
      <div className="popup" ref={this.refWrapPopup}>
        <span className="edit" onClick={this.edit}>
          &Xi;
        </span>
        <div className="actions">
          <button className="primary_button">Сохранить</button>
        </div>
        <span className="cross" onClick={this.props.changeShow}>
          &times;
        </span>
        <input className="name" type="text"
          value={this.state.name} onChange={this.handleChange}
        />
        <textarea className="description_input" name='value'
          value={ this.state.description }
        />
        <div className="img">
          <img src={`./img/${this.state.id}.jpg`} alt={this.state.id}></img>
        </div>
      </div>
    );
  }

  refWrapPopup = (node) => {
    this.wrapPopup = node;
  }

  handleClick = (event) => {
    if (!this.wrapPopup.contains(event.target)) {
      this.props.changeShow();
    }
  }

  handleChange = (event) => {
    const name = event.target.value;
    const character = this.state.character;
    character.name = name;
    this.setState({
      name
    });
    console.log("handleChange");
  }

  addCharacter = () => {
    
  }

  edit = () => {
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