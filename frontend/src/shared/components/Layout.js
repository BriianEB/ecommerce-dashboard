import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from './Header';
import ProgressBar from 'shared/components/ProgressBar';
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
        <Box
            sx={{
                position: 'relative',
                minHeight: '100%'
            }}
        >
            <ProgressBar />
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
    );
}

export default Layout;