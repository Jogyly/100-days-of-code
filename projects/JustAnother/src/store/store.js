import { observable, action } from 'mobx';

class Store {
  @observable characters;

  constructor(characters) {
    this.characters = characters;
  }

  @action
  initializeStore = (characters) => {
    this.characters = characters;
  }

  @action
  changeStore = (characters) => {
    this.characters = characters;
  }
}

export default Store;