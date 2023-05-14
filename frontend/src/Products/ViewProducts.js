import { useState, useEffect } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/Table/DataTable';
import TableFilter from 'shared/components/Table/TableFilter';
import TableExport from 'shared/components/Table/TableExport';
import TableSearch from 'shared/components/Table/TableSearch';

import AddIcon from '@mui/icons-material/Add';


const columns = [
    {
        id: 'id',
        numeric: false,
        label: 'ID',
    },
    {
      id: 'name',
      numeric: false,
      label: 'Name',
    },
    {
      id: 'price',
      numeric: true,
      label: 'Price',
    }
];

function ViewProducts() {
    const [filter, setFilter] = useState();

    const [getProducts, reqStatus, products, reqErrors] = useApi.get('/products');

    useEffect(function () {
        getProducts();
    }, [getProducts]);

    function handleSearch(term) {
        setFilter(term);
    }

    if (reqStatus !== 'completed') {
        return null;
    }

    if (reqErrors) {
        console.log(reqErrors);
    }

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
                <Typography variant="h6">Products</Typography>
                <Breadcrumbs
                    links={[
                        { name: 'Dashboard', path: '/' },
                        { name: 'Products', path: '/products' }
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
                            <Button variant="contained" startIcon={<AddIcon />} href="create">
                                <Typography variant="body">Add Product</Typography>
                            </Button>
                        </Box>
                        <Box sx={{ width: '300px' }}>
                            <TableSearch
                                fields={[
                                    'name',
                                    'price'
                                ]}
                                onSelect={handleSearch}
                            />
                            <Box sx={{ px: 1, py: 2 }}>
                                <TableFilter />
                                <TableExport />
                            </Box>
                        </Box>
                    </Box>
                    <DataTable
                        columns={columns}
                        rows={products}
                        rowsPerPage={5}
                        filter={filter}
                    />
                </Card>
            </Box>
        </Box>        
    );
}

export default ViewProducts;