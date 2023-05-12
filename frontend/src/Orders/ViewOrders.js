import { Box, Button, Card, Typography } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/DataTable';
import TableFilter from 'shared/components/DataTable/TableFilter';
import TableExport from 'shared/components/DataTable/TableExport';
import TableSearch from 'shared/components/DataTable/TableSearch';

import AddIcon from '@mui/icons-material/Add';

function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }
  
  const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ];

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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 1.5
                        }}
                    >
                        <Box>
                            <Button variant="contained" startIcon={<AddIcon />}>
                            <Typography variant="body">Add Order</Typography>
                            </Button>
                        </Box>
                        <Box sx={{ width: '300px' }}>
                            <TableSearch />
                            <Box sx={{ px: 1, py: 2 }}>
                                <TableFilter />
                                <TableExport />
                            </Box>
                        </Box>
                    </Box>
                    <DataTable
                        rows={rows}
                        rowsPerPage={5}
                    />
                </Card>
            </Box>
        </Box>        
    );
}

export default ViewOrders;