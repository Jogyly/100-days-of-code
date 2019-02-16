import styled from "styled-components";

const Toolbar = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  background-color: white;
  border: 2px #5ca0be solid;
  height: 64px;
`;

const ToolbarBack = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const ToolbarMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px 0 20px;

  input {
    border: 1px #5ca0be solid;
    margin-right: 5px;

    ::selection {
      background-color: cyan;
    }
  }

  div {
    width: 15px;
    height: 15px;
    background-color: #5ca0be;
    cursor: pointer;
  }
`;

const ToolBarSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  font-size: 36px;
  border: 2px #5ca0be solid;
  cursor: pointer;

  :hover {
    background-color: #86b9ce;
  }

`;

const ToolBarSideMini = styled(ToolBarSide)`
  position: fixed;
  top: 0;
  background-color: white;
  height: 20px;
  width: 20px;
  font-size: 15px;
`;

export default { 
  Toolbar,
  ToolbarBack,
  ToolBarSide,
  ToolBarSideMini,
  ToolbarMain,
};