import { observable, action, observe } from 'mobx';

class Store {
  // @observable characters;
  @observable characters = new Map();

  constructor(characters) {
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
  addCharacter = (parentId, newCharacter) => {
    console.log(`add for parent ${parentId} new char`);
    newCharacter.new = "true";
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
  changeStore = (characters) => {
    this.characters = characters;
  }

  @action
  saveChange = (id, name, description) => {
    console.log("asd");
    const character = this.characters.get(id);
    this.characters.set(id, {...character, name, description});
    debugger;
    console.dir(this.characters);
  }
}

export default Store;