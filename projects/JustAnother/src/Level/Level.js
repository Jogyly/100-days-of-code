import React from 'react';
import "./Level.css"; 
import Node from "../Node/Node.js";
import Branch from "../Branch/Branch.js";
import { observer, inject, Provider } from 'mobx-react';

@observer
class Level extends React.Component{

  renderLevel = () => {
    let level = [];
    console.log("start render level");
    console.dir(this.props.characters);
    const length = this.props.characters.length;
    for(let i = 0; i < length; i++){
      console.dir(this.props.characters);
      const id = this.props.characters[i];
    //this.props.characters.forEach(id => {
      console.log(`id: ${id}`);
      const character = this.props.store.characters.get(id);
      console.dir(character);
      if (character) {
      level.push(
        <div className="all-node">
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
              <Level characters={character.children} store={this.props.store} />
            }
          </div>
        </div>
      )}
    };

    return level;
  }

  render() {
    if (!this.props.characters || this.props.characters.lenght <= 0) {
      return <div></div>
    }
    return (
      <div className="level">
        { this.renderLevel() }
      </div>
    )
  }
}

export default Level;