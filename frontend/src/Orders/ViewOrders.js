import { Box, Card, Typography } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/DataTable';


function ViewOrders() {
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    my: 3
                }}
            >
                <Typography variant="h6">Orders</Typography>
                <Breadcrumbs
                    links={[
                        { name: 'Dashboard', path: '/' },
                        { name: 'Orders', path: '/orders' }
                    ]}
                />
            </Box>

            <Box>
                <Card sx={{p: 1.5 }}>
                    <DataTable />
                </Card>
            </Box>
        </Box>        
    );
}

export default ViewOrders;