import { Box, Typography } from '@mui/material';


function NotFound() {
    return (
        <Box
            sx={{                
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Typography variant="h2" color="primary.main">Error 404</Typography>
            <Typography variant="body">Page not found</Typography>
        </Box>
    );
}

export default NotFound;