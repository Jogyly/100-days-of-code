import * as React from "react";
import Node from "../Node/Node.js"
import "./Level.css";
import styles from "./styles.js";
import { ICharacter } from "../interfaces";

interface IBranchProps {
  character: ICharacter;
  i: number;
  length: number;
}

class Branch extends React.Component<IBranchProps> {
  render() {
    const { character, i, length } = this.props;
    return (
      <React.Fragment>
        <div className="right-line">
          <styles.GorizontalLine hidden={ i === 0 }>
            <line x1="0" y1="0" x2="800" y2="0" style={{stroke: "black"}} />
          </styles.GorizontalLine>
          <styles.GorizontalLine hidden={ i === length - 1 }>
            <line x1="0" y1="0" x2="800" y2="0" style={{stroke: "black"}} />
          </styles.GorizontalLine>
        </div>
        <styles.VerticalLine>
          <line x1="0" y1="0" x2="0" y2="800" style={{stroke: "black"}} />
        </styles.VerticalLine>

        {this.props.children}

        <styles.VerticalLine 
          hidden={
            !character.children ||
            character.children.length === 0
          }
        >
          <line x1="0" y1="0" x2="0" y2="800" style={{stroke: "black"}} />
        </styles.VerticalLine> 
      </React.Fragment>
    );
  }
}

export default Branch;