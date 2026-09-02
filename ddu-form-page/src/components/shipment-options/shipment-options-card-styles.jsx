import styled from "styled-components"
import { MAIN_COLOR, LIGHT_MAIN_COLOR, MAIN_COLOR_SHADOW, Black, TextGrey } from "../../styles/colors.jsx";

export const ShipmentOptionsCardContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ selected }) => (selected ? LIGHT_MAIN_COLOR : "#fff")};
    box-shadow: ${({ selected }) => (selected ? `0 0 0 1px ${MAIN_COLOR_SHADOW}` : "none")};
    padding: 24px;
    border-radius: 8px;
    border: 1px solid
    ${({ selected }) => (selected ? MAIN_COLOR : "#eaecee")};
    overflow: hidden;
    cursor: pointer;
    transition: .2s all ease;
    i {
        display: block;
        color: ${MAIN_COLOR};
        margin-right: 16px;
    }
    h6 {
        color: ${Black};
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 0;
    }
    p {
        font-size: 14px;
         font-weight: ${({ selected }) => (selected ? 700 : 400)};
        line-height: 21px;
        color: ${TextGrey};
    }

    @media screen and (max-width: 767.5px) {
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        padding: 24px 16px;
        i {
            font-size: 22px;
            margin-bottom: 24px;
            margin-right: 0;
        };
    }
`