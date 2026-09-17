import styled from "styled-components";
import { BGGrey, MAIN_COLOR, LIGHT_MAIN_COLOR, MAIN_COLOR_SHADOW, BorderGrey, BorderGrey2, Red, TextGrey } from "../../styles/colors";

export const OptionCardContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border: 1px solid ${BorderGrey};
    border-radius: 10px;
    cursor: pointer;
    width: 50%;

    ${({ selected }) =>
    selected &&
    `
      border-color: ${MAIN_COLOR};
      background: ${LIGHT_MAIN_COLOR};
      box-shadow: 0 0 4px ${MAIN_COLOR_SHADOW};
    `}

    i {
        display: block;
        width: 20px;
        height: 20px;
        font-size: 19px;
        color: ${MAIN_COLOR}
    }
    p {
        display: block;
        font-weight: 700;
    }
    span {
        font-size: 14px;
        line-height: 21px;
        color: ${TextGrey};
    }
    input {
        display: none;
    }

     @media screen and (max-width: 767.5px) {
        width: 100%;
    }
`

export const UploadedFileElement = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding: 8px 12px;
    border: 1px solid ${BorderGrey2};
    border-radius: 8px;
    &:last-child {
        margin-bottom: 0;
    }
    button {
        width: 24px;
        height: 24px;
        background: transparent;
        border: none;
        color: ${Red};
        cursor: pointer;
        padding: 0;
        font-size: 16px;
        font-weight: 700;
    }
`