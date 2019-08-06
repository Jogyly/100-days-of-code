import * as React from "react";
import { observer, Provider } from "mobx-react";
import utils from "ati-utils";

import Level from "../Level/Level";
import Toolbar from "../Toolbar/Toolbar";
import Store from "../store/store";

import client from "../utils/client";

import { Characters } from "../interfaces";

interface IAppState {
  load: boolean;
  store: Store;
}

interface IResponse {
  characters: Characters;
}

@observer
class App extends React.Component<{}, IAppState>{
  state = {
    load: false,
    store: new Store(),
  }

  componentWillMount = () => {
    client.getCharacters(this.loadRes);
    utils.bitsumToArray();
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