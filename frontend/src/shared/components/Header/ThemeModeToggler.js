import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';

import { toggleThemeMode } from 'store/settingsSlice';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


function ThemeModeToggler() {
    const dispatch = useDispatch();

    const { themeMode } = useSelector((state) => state.settings);

    function handleClick() {
        dispatch(toggleThemeMode());
    }

    return (
        <IconButton onClick={handleClick}>
            {themeMode === 'light' ? (
                <DarkModeIcon />
            ) : (
                <LightModeIcon />
            )}
        </IconButton>
    );
}

export default ThemeModeToggler;