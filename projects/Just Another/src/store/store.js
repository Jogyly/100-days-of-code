import { observable, extendObservable } from 'mobx';

class Store {
  constructor(characters) {
    extendObservable(this, {
      characters: characters,
    });
  }

  initializeStore = (characters) => {
    this.characters = characters;
  }

  changeStore = (characters) => {
    this.characters = characters;
  }
}

export default Store;