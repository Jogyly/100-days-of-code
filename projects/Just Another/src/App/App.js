import React from 'react';
import Level from "../Level/Level.js";
import readTextFile from "../utils/readTextFile.js";
import makeTree from "../utils/makeTree.js";
import { observer } from 'mobx-react';

import Store from "../store/store.js";

class App extends React.Component{
  state = {
    load: false,
    characters: null,
  }

  componentWillMount = () => {
    readTextFile("./characterInfo.json", this.loadRes);
  }

  loadRes = (response) => {
    if (!response || !response.characters) {
      return null;
    }

    let store2 = new Store(response.characters);

    const characters = makeTree(store2.characters);
    this.setState({
      load: true,
      characters,
    })
  }

  render() {
    if (!this.state.load) return ("");
    return (
      <Level characters={this.state.characters} />
  )};
};


export default observer(App);