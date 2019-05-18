import * as React from "react";
import Level from "../Level/Level";
import Toolbar from "../Toolbar/Toolbar";

import readTextFile from "../utils/readTextFile.js";
import { observer, Provider } from "mobx-react";

import Store from "../store/store";
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
    store: new Store(),
  }

  componentWillMount = () => {
    readTextFile("./characterInfo.json", this.loadRes);
  }

  loadRes = (response: IResponse) => {
    if (!response || !response.characters) {
      return null;
    }

    this.state.store.init(response.characters);

    this.setState({
      load: true,
    });
  }

  render() {
    console.log("object");
    const { store, load } = this.state;
    if (!load) return "";
    if (!store.characters) return "";
    return (
      <Provider store={store}>
        <React.Fragment>
          <Toolbar />
          <Level characters={[0]} store={store} />
        </React.Fragment>
      </Provider>
  )}
}

export default observer(App);