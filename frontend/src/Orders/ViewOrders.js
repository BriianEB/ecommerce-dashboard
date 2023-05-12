import { Box, Button, Card, InputAdornment, TextField, Typography } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/DataTable';

import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';


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
                            p: 1.5
                        }}
                    >
                        <Box>
                            <Button variant="contained" startIcon={<AddIcon />}>
                            <Typography variant="body">Add Order</Typography>
                            </Button>
                        </Box>
                        <Box>
                            <TextField
                                variant="standard"
                                InputProps={{
                                    sx: { fontSize: 'body2.fontSize' },
                                    placeholder: 'Search',
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Box sx={{ px: 1, py: 2 }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<FilterAltIcon />}
                                    sx={{
                                        px: 1,
                                        py: 0.25,
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 'body2.fontSize'
                                        }
                                    }}
                                >
                                <Typography variant="body3">Filter</Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<DownloadIcon />}
                                    sx={{
                                        px: 1,
                                        py: 0.25,
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 'body2.fontSize'
                                        }
                                    }}
                                >
                                    <Typography variant="body3">Export</Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <DataTable />
                </Card>
            </Box>
        </Box>        
    );
}

export default ViewOrders;