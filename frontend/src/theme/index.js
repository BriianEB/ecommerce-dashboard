import { createTheme, CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';

import components from './components';
import palette from './palette';


const theme = createTheme({
    components: components,
    palette: palette,
    shape: { borderRadius: 4 }
});

function ThemeProvider({ children }) {
    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

export default ThemeProvider;