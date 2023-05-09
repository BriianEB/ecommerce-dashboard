import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';


function ViewOrders() {
    return (
        <Box>
            <Breadcrumbs
                links={[
                    { name: 'Dashboard', path: '/' },
                    { name: 'Orders', path: '/orders' }
                ]}
                heading="Orders"
            />

            <Box>
                <Card sx={{p: 5}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Head 1</TableCell>
                                <TableCell>Head 2</TableCell>
                                <TableCell>Head 3</TableCell>
                                <TableCell>Head 4</TableCell>
                                <TableCell>Head 5</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1, 2, 3, 4, 5].map(row => (
                                <TableRow key={row}>
                                    <TableCell>Data {row}-1</TableCell>
                                    <TableCell>Data {row}-2</TableCell>
                                    <TableCell>Data {row}-3</TableCell>
                                    <TableCell>Data {row}-4</TableCell>
                                    <TableCell>Data {row}-5</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Card>
            </Box>
        </Box>        
    );
}

export default ViewOrders;