import styled from "styled-components";
import SectionContainer from "../../styles/global-styles.jsx";
import user from '../../config';
import { Black, LightBlue, Aqua, MAIN_COLOR, LIGHT_MAIN_COLOR, BORDER_MAIN_COLOR } from "../../styles/colors.jsx";

export const InfoBannerContainer = styled.div`
    padding: 24px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
    background-color: ${LIGHT_MAIN_COLOR};
    display: flex;
    flex-direction: column;
    gap: 12px 0;
    border: 1px solid ${BORDER_MAIN_COLOR};
`

export const InfoTitle = styled.h4`
    font-size: 21px;
    font-weight: 700;
    line-height: 25px;
    color: ${MAIN_COLOR};
    position: relative;
    padding-left: 30px;
    margin-bottom: 0;
    i {
        display: block;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 3px;
        left: 0;
        color: ${MAIN_COLOR};
    }
`