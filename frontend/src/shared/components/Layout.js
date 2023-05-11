import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import SideNav from './SideNav';
import Header from './Header';


function Layout() {
    const [openSideNav, setOpenSideNav] = useState(true);

    function onOpenSideNavHandler() {
        setOpenSideNav(true);
    }

    function onCloseSideNavHandler() {
        setOpenSideNav(false);
    }

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100%'
            }}
        >
            <Box sx={{ml: '260px'}}>
                <Header onOpenSideNav={onOpenSideNavHandler} />
            </Box>
            <SideNav isOpen={openSideNav} onCloseSideNav={onCloseSideNavHandler} />
            
            <Box
                component="main"
                sx={{
                    ml: '260px'
                }}
            >
                <Container maxWidth="false">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}

export default Layout;