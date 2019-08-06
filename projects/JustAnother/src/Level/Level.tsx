import * as React from "react";
import nanoid from "nanoid/non-secure";
import { observer, Provider } from "mobx-react";

import Node from "../Node/Node";
import Branch from "../Branch/Branch";

import Store from "../store/store";

import styles from "./styles"; 

interface ILevelProps {
  characters: number[];
  store: Store;
}

@observer
class Level extends React.Component<ILevelProps> {
  keys: string[] = [];

  renderLevel = () => {
    let level = [];
    const length = this.props.characters.length;

    for (let i = 0; i < length; i++) {
      if (!this.keys) {
        this.keys = [];
      }

      if (!this.keys[i]) {
        this.keys[i] = nanoid();
      }

      const id = this.props.characters[i];
      const character = this.props.store.characters.get(id);

      if (!character) {
        continue;
      }

      level.push(
        <div key={this.keys[i]} className="all-node">
          <Branch character={character} i={i} length={length}>
            <div className="nodelvl">
              <Provider store={this.props.store}>
                <div>
                  <Node
                    character={character}
                    store={this.props.store}
                    showPopup={!!character.new}
                  />
                </div>
              </Provider>
            </div>
          </Branch>

          <div>
            {!!character.children && character.children.length !== 0 &&
              <Level
                characters={character.children}
                store={this.props.store}
              />
            }
          </div>
        </div>
      )
    }

    return level;
  }

  render() {
    if (!this.props.characters || this.props.characters.length <= 0) {
      return;
    }

    return (
      <styles.Level>
        { this.renderLevel() }
      </styles.Level>
    )
  }
}

export default Level;