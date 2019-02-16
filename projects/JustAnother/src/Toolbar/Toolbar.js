import React from 'react';
import styles from "./styles.js";

class Toolbar extends React.Component{
  state = {
    showToolbar: true,
  }

  componentWillMount = () => {
  }

  hideToolbar = () => {
    this.setState({
      showToolbar: false,
    });
  }

  showToolbar = () => {
    this.setState({
      showToolbar: true,
    });
  }

  render() {
    return (
      <styles.ToolbarBack>
        {this.state.showToolbar &&
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
        {!this.state.showToolbar &&
          <styles.ToolBarSideMini onClick={this.showToolbar}>
            \/
          </styles.ToolBarSideMini>
        }
      </styles.ToolbarBack>
  )};
};

export default Toolbar;