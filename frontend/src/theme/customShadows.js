import { alpha } from '@mui/material/styles';

import palette from './palette';

const lightColor = palette.light.grey[500];
const darkColor = '#313942';


const customShadows = {
    light: {
        card: `0 0 25px 0 ${alpha(lightColor, 0.15)}`,
        popover: `0 0 25px 0 ${alpha(lightColor, 0.4)}`
    },
    dark: {
        card: `0 0 25px 0 ${alpha(darkColor, 0.15)}`,
        popover: `0 0 25px 0 ${alpha(darkColor, 0.4)}`
    } 
};

export default customShadows;