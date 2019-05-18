import { observable, action } from "mobx";

import { ICharacter, Characters } from "../interfaces";

class Store {
  @observable characters: Characters = new Map();

  constructor() {

  }
  // constructor(characters: Characters) {
  //   characters.forEach(element => {
  //     this.characters.set(element.id, {
  //       id: element.id,
  //       name: element.name,
  //       description: element.description,
  //       img: element.img,
  //       children: element.children
  //     });
  //   });
  // }

  @action
  init = (characters: Characters) => {
    characters.forEach(element => {
      this.characters.set(element.id, {
        id: element.id,
        name: element.name,
        description: element.description,
        img: element.img,
        children: element.children
      });
    });
  }

  @action
  addCharacter = (parentId: number, newCharacter: ICharacter) => {
    newCharacter.new = true;
    this.characters.set(newCharacter.id, newCharacter);
    const parent = this.characters.get(parentId);

    if (parent && parent.children) {
      parent.children.push(newCharacter.id);
    }
  }

  getNewId = () => {
    let id = 0;
    while (this.characters.has(id)){
      id++;
    }

    return id;
  }

  @action
  changeStore = (characters: Characters) => {
    this.characters = characters;
  }

  @action
  saveChange = (id: number, name: string, description: string) => {
    const character = this.characters.get(id);
    if (character) {
      const children = character.children;
      this.characters.set(id, {id, children, name, description});
    }
  }
}

export default Store;