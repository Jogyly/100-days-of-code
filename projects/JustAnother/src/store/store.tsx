import { observable, action, observe } from 'mobx';

import { ICharacter, Characters } from "../interfaces";

class Store {
  @observable characters: Characters = new Map();

  constructor(characters: Characters) {
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
    console.log(`add for parent ${parentId} new char`);
    newCharacter.new = true;
    this.characters.set(newCharacter.id, newCharacter);
    const parent = this.characters.get(parentId);
    parent.children 
    ? parent.children.push(newCharacter.id)
    : [newCharacter.id]
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
    console.log("asd");
    const character = this.characters.get(id);
    this.characters.set(id, {...character, name, description});
    debugger;
    console.dir(this.characters);
  }
}

export default Store;