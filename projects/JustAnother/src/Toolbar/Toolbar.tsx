import * as React from "react";
import styles from "./styles.js";
import { inject } from "mobx-react";
import Store from "../store/store";

interface IToolbarState {
  isShowToolbar: boolean;
}

interface IToolbarProps {
  store: Store;
}

@inject("store")
class Toolbar extends React.Component<{}, IToolbarState> {
  state = {
    isShowToolbar: true,
  }

  get injected() {
    return this.props as IToolbarProps;
  }

  hideToolbar = () => {
    this.setState({
      isShowToolbar: false,
    });
  }

  showToolbar = () => {
    this.setState({
      isShowToolbar: true,
    });
  }

  saveCharacters = () => {
    const { store } = this.injected;
    store.saveAll();
  }

  render() {
    const { isShowToolbar } = this.state;
    return (
      <styles.ToolbarBack>
        {isShowToolbar &&
          <styles.Toolbar>
            <styles.ToolBarSide onClick={this.hideToolbar}>
              ^
            </styles.ToolBarSide>
            <styles.ToolbarMain>
              <input />
              <div>S</div>
            </styles.ToolbarMain>
            <styles.ToolBarSide onClick={this.saveCharacters}>
              S
            </styles.ToolBarSide>
          </styles.Toolbar>
        }
        {!isShowToolbar &&
          <styles.ToolBarSideMini onClick={this.showToolbar}>
            \/
          </styles.ToolBarSideMini>
        }
      </styles.ToolbarBack>
  )}
}

export default Toolbar;