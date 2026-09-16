import { styled } from 'styled-components';
import user from '../../../config';
import { Blue, Black, Grey, LightBlue, LIGHT_MAIN_COLOR, MAIN_COLOR, BorderGrey, InputText, BorderBlue, BORDER_MAIN_COLOR } from "../../../styles/colors.jsx";
import {ContactCardHolder} from '../../contact-cards/contact-card-component-styles.jsx';

export const InputHolder = styled.div`
    label {
        display: block;
        font-weight: 600;
        margin-bottom: 8px;
        color: ${MAIN_COLOR};
    }
    input, .form-control {
        display: block;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        background-color: white;
        border: 1px solid ${BorderGrey};
        border-radius: 10px;
        padding: 10px 16px;
        outline: none;
        transition: border-color 0.2s;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.5px;
        color: ${InputText};
        &:focus {
            outline: none;
            border-color: ${BORDER_MAIN_COLOR};
            box-shadow: none;
        }
    }

    .react-tel-input {
        .form-control {
            padding-left: 60px !important;
            font-size: 16px;
        }
        .country-list {
            margin: 0;
            padding: 8px 8px 8px 0;
            width: max-content;
            &::-webkit-scrollbar {
                width: 8px;
            }
            &::-webkit-scrollbar-track {
            background: ${LIGHT_MAIN_COLOR};
            border-radius: 4px;
            }
            &::-webkit-scrollbar-thumb {
            background: ${MAIN_COLOR};
            border-radius: 4px;
            }

            @media screen and (max-width: 767.5px) {
                width: auto;
                min-width: 230px;
            }

            .search {
                display: flex;
                align-items: center;
                gap: 8px;
                top: -12px;
                margin-bottom: 8px;
                .search-emoji {
                    width: 20px;
                    height: 20px;
                    font-size: 0;
                    background: transparent url('./src/assets/img/loop.svg') center no-repeat;
                    background-size: contain;
                }
                .search-box {
                    margin-left: 0;
                }
            }
            .country {
                &:hover {
                    background: ${LIGHT_MAIN_COLOR};
                }
            }
        }
    }

    .flag-dropdown  {
        background-color: white !important;
        border-color: ${BorderGrey};
        width: 50px;
        border-radius: 10px 0 0 10px;
        &:hover {
            border-radius: 10px 0 0 10px;
            border-color: ${BorderGrey};
        }
        &.open {
            border-radius: 10px 0 0 10px;
            &:hover {
                border-radius: 10px 0 0 10px;
            }
            .selected-flag {
                background: transparent;
            }
        }
        .selected-flag {
            border-radius: 10px 0 0 10px;
            &:hover {
                border-radius: 10px 0 0 10px;
            }
        }
    }

    @media screen and (max-width: 767.5px) {
        width: 100% !important;
    }
`

export const InputsRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    gap: 16px;
    &:last-child {
        margin-bottom: 0;
    }
    ${InputHolder} {
        width: 100%;
    }
    ${ContactCardHolder} {
        width: 100%;
    }

    @media screen and (max-width: 767.5px) {
        flex-wrap: wrap;
        gap: 24px 16px;
    }
`

export const SelectHolder = styled.div`
    display: flex;
    select {
        width: 170px;
        padding: 10px 16px;
        border-radius: 10px 0 0 10px;
        cursor: pointer;
        background-color: transparent;
        color: #2c363f;
        border: 1px solid ${BorderGrey};
        border-right: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: transparent url(../../../src/assets/img/triangle-down.svg) center no-repeat;
        background-position: right 10px center;
        background-size: 7px;
        &:focus {
            outline: none;
        }
    }
    input {
        width: calc(100% - 170px);
        border-radius: 0 10px 10px 0;
    }

    @media screen and (max-width: 580px) {
        select {
            width: 100px;
        }
        input {
            width: calc(100% - 100px);
        }
    }
`

export const TitleToggle = styled.div`
    display: block;
    width: fit-content;
    font-weight: 700;
    margin-bottom: 8px;
    color: ${MAIN_COLOR};
    cursor: pointer;
    position: relative;
    margin-bottom: 32px;
    &:after {
        display: block;
        content:'';
        width: 9px;
        height: 9px;
        box-sizing: border-box;
        border-style: solid;
        border-color: ${MAIN_COLOR};
        border-width: 0px 2px 2px 0px;
        transform: rotate(45deg);
        position: absolute;
        top: ${({ toggled }) => (toggled ? "8px" : "5px")};
        right: -20px;
        transition: .3s all ease;
        transform: rotate(${({ toggled }) => (toggled ? "585deg" : "45deg")});
    }
`