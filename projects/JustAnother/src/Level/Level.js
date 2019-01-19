import React from 'react';
import style from "./Level.css"; 
import Node from "../Node/Node.js";

class Level extends React.Component{

  renderLevel = () => {
    let level = [];
    this.props.characters.forEach(element => {
      level.push(
        <div>
          <div className="nodelvl">
            <Node character={element} />
          </div>
          <div>
            {element.children &&
              <Level characters={element.children} />
            }
          </div>
        </div>
      )
    });

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