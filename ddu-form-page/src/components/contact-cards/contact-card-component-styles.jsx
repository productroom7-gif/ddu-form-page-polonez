import styled from "styled-components";
import user from '../../config';
import { Blue, Black, MAIN_COLOR, LightGrey, TextGrey } from "../../styles/colors.jsx";

export const ContactCardHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px 0;
`

export const ContactCardTitle = styled.h5`
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    color: ${MAIN_COLOR};
    position: relative;
    padding-left: 30px;
    margin-bottom: 0;
    i {
        display: block;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 2px;
        left: 0;
        color: ${MAIN_COLOR};
    }
`

export const ContactCardBody = styled.div`
    padding: 16px;
    position: relative;
    background-color: ${LightGrey};
    border-radius: 4px;
    h6 {
        font-size: 16px;
        font-weight: 700;
        color: ${MAIN_COLOR};
        margin-bottom: 4px;
    }
    p {
        color: ${TextGrey};
        font-size: 14px;
        line-height: 21px;
    }
`