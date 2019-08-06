import styled from "styled-components";

interface IProps {
  hidden?: boolean;
}

const RightLine = styled.div`
  height: 2px;
  display: flex;
  justify-content: flex-end; 
`;

const GorizontalLineSvg = styled.svg`
  width: 50%;
  height: 2px;

  visibility: ${(props: IProps) => props.hidden ? "hidden" : "visible"};
`;

const VerticalLineSvg = styled.svg`
  width: 1px;
  height: 13px;
  display: block;
  margin: 0 auto;

  visibility: ${(props: IProps) => props.hidden ? "hidden" : "visible"};
`;

export default {
  GorizontalLineSvg,
  VerticalLineSvg,
  RightLine
};