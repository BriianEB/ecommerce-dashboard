import { Avatar, Box, IconButton, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';


function Header({ onOpenSideNav }) {
    return (
        <Box
            sx={{
                bgcolor: (theme) => theme.palette.grey[0],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '70px',
                pl: 2,
                pr: 2,
                boxShadow: (theme) => `0 0 25px 0 ${alpha(theme.palette.grey[500], 0.15)}`
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
                <IconButton><DarkModeIcon /></IconButton>
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