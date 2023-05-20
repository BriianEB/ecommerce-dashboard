import { Avatar, Box, IconButton, Stack } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import ThemeModeToggler from './ThemeModeToggler';
import Language from './Language';


function Header({ onOpenSideNav }) {
    return (
        <Box
            sx={{
                bgcolor: (theme) => theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '70px',
                pl: 2,
                pr: 2,
                boxShadow: (theme) => theme.customShadows.card
            }}
        >
            <Box>
                <IconButton
                    onClick={onOpenSideNav}
                    sx={{
                        display: 'none',
                    }}
                >
                    <MenuIcon />
                </IconButton> 
            </Box>           
            
            <Stack direction="row" alignItems="center" spacing={1.5}>
                <Language />
                <ThemeModeToggler />
                <IconButton><NotificationsIcon /></IconButton>
                <IconButton
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    <Avatar sx={{bgcolor: 'primary.main'}}>B</Avatar>
                </IconButton>
            </Stack>
        </Box>
    );
}

export default Header;