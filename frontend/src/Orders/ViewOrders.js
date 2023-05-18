import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/Table/DataTable';
import TableFilter from 'shared/components/Table/TableFilter';
import TableExport from 'shared/components/Table/TableExport';
import TableSearch from 'shared/components/Table/TableSearch';

import { finishProgress } from 'store/progressBarSlice';

import AddIcon from '@mui/icons-material/Add';

const columns = [
    {
        id: 'id',
        numeric: false,
        label: 'ID',
    },
    {
        id: 'total',
        numeric: true,
        label: 'Total'
    }
];


function ViewOrders() {
    const [filter, setFilter] = useState();

    const dispatch = useDispatch();

    const [getOrders, reqStatus, orders, reqErrors] = useApi.get('/orders');

    useEffect(function () {
        getOrders();
    }, [getOrders]);

    useEffect(function () {
        if (reqStatus === 'completed') {
            dispatch(finishProgress());
        }
    }, [dispatch, reqStatus]);

    function handleSearch(term) {
        setFilter(term);
    }

    if (reqStatus !== 'completed') {
        return null;
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
                            <TableSearch
                                fields={[
                                    'name',
                                    'calories',
                                    'fat'
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
                        rows={orders}
                        filter={filter}
                    />
                </Card>
            </Box>
        </Box>        
    );
}

export default ViewOrders;