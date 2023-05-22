import { Outlet } from "react-router-dom";
import { Box, Container } from '@mui/material';

import ProgressBar from 'shared/components/ProgressBar';


function Layout() {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <ProgressBar />            
            <Box>
                <Container maxWidth="false">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}

export default Layout;