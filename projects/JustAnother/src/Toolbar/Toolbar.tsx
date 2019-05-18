import * as React from "react";
import styles from "./styles.js";

interface IToolbarState {
  isShowToolbar: boolean;
}

class Toolbar extends React.Component<{}, IToolbarState> {
  state = {
    isShowToolbar: true,
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
            <styles.ToolBarSide>
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