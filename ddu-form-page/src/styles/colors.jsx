import user from '../config';

export const Blue = "#2361a9";
export const LightBlue = "#e6f7ff";
export const Aqua = '#91d5ff';
export const Red = "#E1182B";
export const Black = "#1d1d1b";
export const Grey = '#212529'
export const BGGrey = '#f0f8ff';
export const LightGrey = '#eee'
export const TextGrey = '#6C757D'
export const BorderGrey = '#dcdde0'
export const BorderBlue = '#008cff'
export const BorderGrey2 = '#dddddd'
export const InputText = '#2c363f'

export const MAIN_COLOR = user === "meest" ? Blue : Red;
export const LIGHT_MAIN_COLOR = user === "meest" ? LightBlue : '#fde8ea';
export const MAIN_COLOR_SHADOW = user === "meest" ? 'rgba(149, 180, 232, 0.3)' : 'rgba(225, 24, 43, 0.25)';
export const BORDER_MAIN_COLOR = user === "meest" ? BorderBlue : Red;
export const HOVER_MAIN_COLOR = user === "meest" ? '#008cff' : '#c11322';
export const BODY_BG = user === "meest" ? '#f4f7fc' : '#fcf4f4';