import styled from "styled-components";

const GorizontalLine = styled.svg`
  width: 50%;
  height: 2px;

  visibility: ${props => props.hidden ? "hidden" : "visible"}
`;

const VerticalLine = styled.svg`
  width: 1px;
  height: 13px;
  display: block;
  margin: 0 auto;

  visibility: ${props => props.hidden ? "hidden" : "visible"}
`;

export default { GorizontalLine, VerticalLine };