import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
    createTheme,
    CssBaseline,
    ThemeProvider as MUIThemeProvider
} from '@mui/material';

import components from './components';
import customShadows from './customShadows';
import palette from './palette';


function ThemeProvider({ children }) {
    const { themeMode } = useSelector((state) => state.settings);

    const themeOptions = useMemo(function () {
        return {
            components: components,
            palette: palette[themeMode],
            shape: { borderRadius: 4 },
            typography: {
                body3: {
                    fontSize: '0.82rem',
                    fontWeight: 400
                }
            },
            customShadows: customShadows[themeMode]
        };
    }, [themeMode]);

    const theme = createTheme(themeOptions);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

export default ThemeProvider;