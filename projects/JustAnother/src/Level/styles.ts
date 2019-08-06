import styled from "styled-components";

const Level = styled.div`
  display: flex;

  .nodelvl {
    display: grid;
    justify-content: center;
    padding: 5px;
  }

  .gorizontal_line {
    margin-top: 10px;
    width: 50%;
    height: 2px;
  }

  .right-line {
    height: 2px;
    display: flex;
    justify-content: flex-end; 
  }

  .right-line .gorizontal_line {
    margin-top: -6px;
  }

  .right-line .gorizontal_line_invis {
    margin-top: -6px;
  }

  .gorizontal_line_invis {
    margin-top: 10px;
    width: 50%;
    height: 2px;
    visibility: hidden;
  }

  .vertical_line {
    width: 1px;
    height: 15px;
    display: block;
    margin: -5px auto;
  }

  .vertical_line_invis {
    width: 1px;
    height: 15px;
    display: block;
    margin: -5px auto;
    visibility: hidden;
  }

  svg {
    stroke: black;
  }

  .test {
    display: flex;
  }
`;

export default { Level }
