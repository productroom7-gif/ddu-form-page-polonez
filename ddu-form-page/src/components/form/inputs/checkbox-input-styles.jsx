
import styled from "styled-components";
import { MAIN_COLOR, BorderGrey } from "../../../styles/colors";

export const CheckboxLabel = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: rgba(27, 43, 60, 0.5);
    margin-bottom: 24px;
    cursor: pointer;
    &:last-child {
        margin-bottom: 0;
    }
    input {
        display: none;
    }
    label {
        display: block;
        padding-left: 28px;
        position: relative;
        cursor: pointer;
        &:before {
            display: block;
            content:'';
            width: 18px;
            height: 18px;
            border: 1px solid ${BorderGrey};
            position: absolute;
            top: 3px;
            left: 0;
            border-radius: 2px;
        }
        a {
            color: ${MAIN_COLOR}
        }
    }

    input:checked + label:before {
        background-color: ${MAIN_COLOR};
        border-color: ${MAIN_COLOR};
    }

    input:checked + label:after {
        content: "✔";
        position: absolute;
        left: 4.5px;
        top: 3px;
        font-size: 12px;
        color: white;
    }
`