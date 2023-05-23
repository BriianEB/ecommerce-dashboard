import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    MenuItem,
    Popover,
    Typography
} from '@mui/material';

import useAuth from 'shared/hooks/useAuth';
import { logout } from 'store/authSlice';
import { removeSession } from 'shared/utils/auth';


function MyAccount() {
    const dispatch = useDispatch();
    const { t } = useTranslation();    
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleLogout() {
        handleClose();
        removeSession();
        dispatch(logout());
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <Avatar sx={{bgcolor: 'primary.main'}}>
                    {user?.email[0].toUpperCase()}
                </Avatar>                
            </IconButton>        
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        minWidth: '160px',
                    }
                }}
            >
                <Box
                    sx={{ px: 2.5, py: 1.5 }}
                >
                    <Typography sx={{ color: 'text.secondary' }}>
                        {user?.email}
                    </Typography>
                </Box>
                <Divider />
                <div>
                    <MenuItem
                        sx={{ px: 2.5, py: 1.5 }}
                        onClick={handleLogout}
                    >
                        <Typography>
                            {t('auth.logout')}
                        </Typography>
                    </MenuItem>
                </div>
            </Popover>    
        </>
    );
}

export default MyAccount;