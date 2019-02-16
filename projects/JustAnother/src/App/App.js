import React from 'react';
import Level from "../Level/Level.js";
import Toolbar from "../Toolbar/Toolbar.js";

import readTextFile from "../utils/readTextFile.js";
import makeTree from "../utils/makeTree.js";
import { observer, Provider } from 'mobx-react';

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

    // console.dir(makeTree(response.characters));

    let store2 = new Store(response.characters);
    console.dir(response.characters);
    console.dir(store2);
    // const characters = makeTree(store2.characters);
    this.setState({
      load: true,
      characters: store2,
    })
  }

  render() {
    if (!this.state.load) return ("");
    return (
      <Provider store={this.state.characters}>
        <React.Fragment>
          <Toolbar store={this.state.characters} />
          <Level characters={[0]} store={this.state.characters} />
        </React.Fragment>
      </Provider>
  )};
};


export default observer(App);