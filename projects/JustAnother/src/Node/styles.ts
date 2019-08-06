import styled from "styled-components";

//opacity: 0.5;

interface IProps {
  active?: boolean;
}

const Node = styled.div`
  color: ${(props: IProps) => props.active ? "white" : "#5ca0be"};
  background-color: ${(props: IProps) => props.active ? "#5ca0be" : "white"};
  border: 2px solid #5ca0be;
  border-radius: 3px;
  font: Arial;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;

  :hover {
    box-shadow: 0 0 20px rgba(92,160,190,1);
    cursor: pointer;
  }
`;

const Button = styled.button`
  background-color: #5ca0be;
  border: 1px solid black;
  position: absolute;
  visibility: ${(props: IProps) => props.active ? "visible" : "hidden"};

  :hover {
    box-shadow: 0 0 20px rgba(92,160,190,1);
    cursor: pointer;
  }

  &.add {
    margin: 1px 41px;
  }

  &.delete {
    margin: -19px 106px;
  }
`;

export default { Node, Button };
