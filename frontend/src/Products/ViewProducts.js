import { useState, useEffect } from 'react';
import { useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Box, Button, Card, MenuItem, Typography } from '@mui/material';

import useDeepMemo from 'shared/hooks/useDeepMemo';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/Table/DataTable';
import TableFilter from 'shared/components/Table/TableFilter';
import TableExport from 'shared/components/Table/TableExport';
import TableSearch from 'shared/components/Table/TableSearch';
import DeleteDalog from 'shared/components/DeleteDialog';

import { notifySuccess } from 'store/notificationSlice';

import { api } from 'shared/utils/apiRequest';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function ViewProducts() {
    const dispatch = useDispatch();
    const fetcher = useFetcher(); // Fetcher para la acción de eliminar producto
    const navigate = useNavigate();
    const { t } = useTranslation();

    const products = useLoaderData();
    const [filter, setFilter] = useState();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [rowToDelete, setRowToDelete] = useState();

    const columns = useDeepMemo([
        {
            id: 'id',
            numeric: false,
            label: t('products.product.id')
        },
        {
            id: 'name',
            numeric: false,
            label: t('products.product.name')
        },
        {
            id: 'price',
            numeric: true,
            label: t('products.product.price')
        }
    ]);

    useEffect(function () {
        if (fetcher.state === 'idle' && fetcher.data?.state === 'success') {
            dispatch(notifySuccess(
                `${t('products.product.product')} ${t('actions.deleteSuccess')}`
            ));
        }
    }, [fetcher.state, fetcher.data, dispatch, t]);

    function handleSearch(term) {
        setFilter(term);
    }

    function handleCloseDeleteDialog() {
        setShowDeleteConfirmation(false);
    }

    function handleClickEditRow(row) {
        navigate(`${row.id}/edit`);
    }

    function handleClickDeleteRow(row) {
        setRowToDelete(row);
        setShowDeleteConfirmation(true);
    }

    function handleDeleteRow() {
        setShowDeleteConfirmation(false);

        fetcher.submit(null, {
            method: 'delete',
            action: `${rowToDelete.id}/delete`
        });
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
                <Typography variant="h6">{t('products.label')}</Typography>
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
                            <Button variant="contained" startIcon={<AddIcon />} href="create">
                                <Typography variant="body">
                                    {`${t('actions.add')} ${t('products.product.product')}`}
                                </Typography>
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
                    <DataTable
                        columns={columns}
                        rows={products}
                        filter={filter}
                        actions={(row, closeActions) => (
                            <>
                                <MenuItem
                                    onClick={function () {
                                        closeActions();

                                        return handleClickEditRow(row);
                                    }}
                                >
                                    <EditIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {t('actions.edit')}
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={function () {
                                        closeActions();

                                        return handleClickDeleteRow(row);
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {t('actions.delete')}
                                    </Typography>
                                </MenuItem>
                            </>
                        )}
                    />
                </Card>
            </Box>
            <DeleteDalog
                name={rowToDelete?.name}
                open={showDeleteConfirmation}
                onClose={handleCloseDeleteDialog}
                onDelete={handleDeleteRow}
            />
        </Box>        
    );
}

export function loader() {
    return api.get('/products');
}


export default ViewProducts;