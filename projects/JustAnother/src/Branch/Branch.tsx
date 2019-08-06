import * as React from "react";
import styles from "./styles";

import { ICharacter } from "../interfaces";

interface IBranchProps {
  character: ICharacter;
  i: number;
  length: number;
  children: React.ReactNode;
}

const { RightLine, GorizontalLineSvg, VerticalLineSvg } = styles;

const Branch = ({ character, i, length, children }: IBranchProps) => (
  <React.Fragment>
    <RightLine>
      <GorizontalLineSvg hidden={ i === 0 }>
        <line x1="0" y1="0" x2="800" y2="0" style={{ stroke: "black" }} />
      </GorizontalLineSvg>

      <GorizontalLineSvg hidden={ i === length - 1 }>
        <line x1="0" y1="0" x2="800" y2="0" style={{ stroke: "black" }} />
      </GorizontalLineSvg>
    </RightLine>

    <VerticalLineSvg>
      <line x1="0" y1="0" x2="0" y2="800" style={{stroke: "black"}} />
    </VerticalLineSvg>

    {children}

    <VerticalLineSvg 
      hidden={
        !character.children ||
        character.children.length === 0
      }
    >
      <line x1="0" y1="0" x2="0" y2="800" style={{ stroke: "black" }} />
    </VerticalLineSvg> 
  </React.Fragment>
);

export default Branch;