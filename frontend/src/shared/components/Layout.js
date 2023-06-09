import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import AuthGuard from './AuthGuard';
import Header from './Header';
import SideNav from './SideNav';


function Layout() {
    const [openSideNav, setOpenSideNav] = useState(true);

    function handleOpenSideNav() {
        setOpenSideNav(true);
    }

    function handleCloseSideNav() {
        setOpenSideNav(false);
    }

    return (
        <AuthGuard>
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100%'
                }}
            >            
                <Box sx={{ml: '260px'}}>
                    <Header onOpenSideNav={handleOpenSideNav} />
                </Box>
                <SideNav isOpen={openSideNav} onCloseSideNav={handleCloseSideNav} />
                
                <Box
                    component="main"
                    sx={{
                        ml: '260px'
                    }}
                >
                    <Container maxWidth="false" sx={{ pb: 3 }}>
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </AuthGuard>        
    );
}

export default Layout;