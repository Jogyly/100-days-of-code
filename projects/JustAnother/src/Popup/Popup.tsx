import * as React from "react";
import { inject, observer } from "mobx-react";

import styles from "./styles";

import { ICharacter } from "../interfaces";
import Store from "../store";

import client from "../utils/client";

interface IPopupState {
  character: ICharacter;
  id: number;
  name: string;
  description: string;
  edit: boolean;
  img?: string; 
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
    img: this.props.character.img,
  }
  
  get injected() {
    return this.props as InjectedProps;
  }

  wrapPopup?: HTMLDivElement;

  componentDidMount = () => {
    const { img, id } = this.state;
    const { store } = this.injected;

    if (!img) {
      client.getImage(id)
        .then(result => {
          this.setState({
            img: result,
          });
          store.saveImage(id, result);
        });
    }
    else {
      console.log("IMG");
      console.log(img);
    }

    document.addEventListener("click", this.handleClick);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClick);
    document.body.style.overflow = "";
  }

  onChangeImage = (e: any) => {
    // try {
    //   const t = e.target.files[0];
    //   debugger;
    //   console.log(e.target.files[0]);
    //   console.log(JSON.stringify(e.target.files[0]));
    // }
    // catch (ex) {
    //   console.error(ex);
    // }
    console.log(e.target.files[0].name);
    const ext = e.target.files[0].name.match(/\.[a-z]+$/s);
    const name = this.state.id.toString() + ext;
    const formData = new FormData();
    formData.append("file", e.target.files[0], name);
    // formData.append("name", this.state.id.toString());

    client.saveImage(formData);
  }

  renderCharacter = () => {
    return (
      <styles.Popup ref={this.refWrapPopup}>
        <span className="edit" onClick={this.handleEdit}>
          &Xi;
        </span>

        <span className="cross" onClick={this.closePopup}>
          &times;
        </span>

        <div className="name">
          { this.state.name }
        </div>

        <div className="description">
          { this.state.description }
        </div>

        <div className="img">
          <img src={this.state.img} alt={this.state.id.toString()}></img>
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

        <span className="cross" onClick={this.closePopup}>
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
          <img src={this.state.img} alt={this.state.id.toString()}></img>

          <input
            className="input-image"
            type='file'
            onChange={this.onChangeImage}
          />
        </div>
      </styles.Popup>
    );
  }

  refWrapPopup = (node: HTMLDivElement) => {
    this.wrapPopup = node;
  }

  handleClick = (event: any) => {
    if (this.wrapPopup && !this.wrapPopup.contains(event.target)) {
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
      { 
        this.state.edit 
          ? this.renderEdit()
          : this.renderCharacter()
      }
      </React.Fragment>
    );
  }
}

export default Popup;