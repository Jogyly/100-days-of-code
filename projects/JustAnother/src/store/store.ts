import { observable, action, toJS } from "mobx";

import { ICharacter, Characters } from "../interfaces";

import client from "../utils/client";

enum st {
  res = "Опиши меня полностью"
}

class Store {
  @observable characters: Characters = new Map();

  constructor() {
  }

  @action
  init = (characters: Characters) => {
    characters.forEach(element => {
      this.characters.set(element.id, {
        id: element.id,
        name: element.name,
        description: element.description,
        img: element.img,
        children: element.children,
        parent: element.parent,
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

  @action
  deleteCharacter = (id: number, parent: number, children: number[]) => {
    const character = this.characters.get(parent);

    if (!character) {
      return;
    }

    const set = new Set(character.children);
    set.delete(id);
    const newChildren = [ ...Array.from(set), ...children];

    character.children = newChildren;
    // character.children.push(...children);

    this.characters.delete(id);
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

  saveChange = (id: number, name: string, description: string) => {
    const character = this.characters.get(id);
    if (character) {
      const children = character.children;
      const img = character.img;
      const parent = character.parent;
      // this.characters.delete(id);
      this.characters.set(id, {id, children, name, description, img, parent});
    }
  }

  saveImage = (id: number, img: string) => {
    const character = this.characters.get(id);
    if (character) {
      const children = character.children;
      const name = character.name;
      const description = character.description;
      const parent = character.parent;
      // this.characters.delete(id);
      this.characters.set(id, {id, children, name, description, img, parent});
    }
  }

  saveAll = () => {
    console.log("to JS: ", Array.from(toJS(this.characters)));

    let characters: ICharacter[] = [];
    const v = this.characters.forEach(element => {
      characters.push(toJS(element));
    });
    console.log(characters);

    const body = JSON.stringify({ characters: characters });
    client.saveCharacters(body);
  }
}

export default Store;