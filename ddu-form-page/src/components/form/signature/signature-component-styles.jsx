import styled from "styled-components";
import { MAIN_COLOR, BorderGrey } from "../../../styles/colors";
import { FlexContainer } from "../../../styles/global-styles";

export const CanvasWrapper = styled.div`
  border: 1px solid ${BorderGrey};
  border-radius: 8px;
  background: white;
  width: 100%;
  height: 412px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  &:before {
    display: block;
    content:'';
    position: absolute;
    border-top: black solid 2px;
    bottom: 15%;
    width: 72%;
    left: 14%;
    z-index: 1;
  }
    ${FlexContainer} {
        border-bottom: 1px solid ${BorderGrey};
        padding: 16px 28px;
    }
`;

export const ClearSignButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: ${MAIN_COLOR};
  background: transparent;
  padding: 0;
  &:focus {
    outline: none;
  }
`;