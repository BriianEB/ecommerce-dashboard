import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Button, Card, Typography } from '@mui/material';
import { List } from 'react-content-loader';

import useDeepMemo from 'shared/hooks/useDeepMemo';
import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/Table/DataTable';
import TableFilter from 'shared/components/Table/TableFilter';
import TableExport from 'shared/components/Table/TableExport';
import TableSearch from 'shared/components/Table/TableSearch';

import AddIcon from '@mui/icons-material/Add';


function ViewOrders() {
    const { t } = useTranslation();
    const [getOrders, getStatus, orders, getError] = useApi.get('/orders');
    
    const [filter, setFilter] = useState();    

    useEffect(function () {
        getOrders();
    }, [getOrders]);

    function handleSearch(term) {
        setFilter(term);
    }

    if (getError) {
        console.log(getError);
    }

    const columns = useDeepMemo([
        {
            id: 'id',
            numeric: false,
            label: t('orders.order.id'),
        },
        {
            id: 'total',
            numeric: true,
            label: t('orders.order.total')
        }
    ]);

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
                <Typography variant="h6">{t('orders.label')}</Typography>
                <Breadcrumbs />
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
                                {`${t('actions.add')} ${t('orders.order.order')}`}
                            </Button>
                        </Box>
                        <Box sx={{ width: '300px' }}>
                            <TableSearch
                                fields={columns.map((column) => ({
                                    key: column.id,
                                    label: column.label
                                }))}
                                onSelect={handleSearch}
                            />
                            <Box sx={{ px: 1, py: 2 }}>
                                <TableFilter />
                                <TableExport />
                            </Box>
                        </Box>
                    </Box>
                    {getStatus === 'completed' ? (
                        <DataTable
                        columns={columns}
                        rows={orders}
                        filter={filter}
                    />
                    ) : (
                        <List />
                    )}
                </Card>
            </Box>
        </Box>        
    );
}

export default ViewOrders;