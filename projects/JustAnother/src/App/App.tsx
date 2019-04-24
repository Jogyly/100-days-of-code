import * as React from "react";
import Level from "../Level/Level.js";
import Toolbar from "../Toolbar/Toolbar.js";

import readTextFile from "../utils/readTextFile.js";
import makeTree from "../utils/makeTree.js";
import { observer, Provider } from 'mobx-react';

import Store from "../store/store.js";
import { Characters } from "../interfaces";

interface IAppState {
  load: boolean;
  store: Store;
}

interface IResponse {
  characters: Characters;
}

class App extends React.Component<{}, IAppState>{
  state = {
    load: false,
    store: null,
  }

  componentWillMount = () => {
    readTextFile("./characterInfo.json", this.loadRes);
  }

  loadRes = (response: IResponse) => {
    if (!response || !response.characters) {
      return null;
    }

    const store = new Store(response.characters);

    this.setState({
      load: true,
      store,
    });
  }

  render() {
    const { store, load } = this.state;
    if (!load) return ("");
    return (
      <Provider store={store}>
        <React.Fragment>
          <Toolbar />
          <Level characters={[0]} store={store} />
        </React.Fragment>
      </Provider>
  )};
};


export default observer(App);