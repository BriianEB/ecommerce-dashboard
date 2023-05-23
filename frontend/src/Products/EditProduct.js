import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Box, Card, Typography } from '@mui/material';
import { List } from 'react-content-loader';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';
import { notifySuccess } from 'store/notificationSlice';


function EditProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const params = useParams();
    const productId = params.id;
    
    // eslint-disable-next-line
    const [getProduct, getStatus, product, getErrors] = useApi.get(`/products/${productId}`);
    // eslint-disable-next-line
    const [patchProduct, patchStatus, updatedProduct, patchErrors] = useApi.patch(`/products/${productId}`);

    useEffect(function () {
        getProduct();
    }, [getProduct]);

    useEffect(function () {
        if (patchStatus === 'completed') {
            dispatch(notifySuccess(
                `${t('products.product.product')} ${t('actions.editSuccess')}`
            ));
            navigate('/products');
        }
    }, [patchStatus, navigate, dispatch, t]);

    function handleSubmit(data) {
        patchProduct(data);
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
                <Typography variant="h6">
                    {`${t('actions.edit')} ${t('products.product.product')}`}
                </Typography>
                <Breadcrumbs />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Card
                    sx={{
                        p: 4,
                        width: '50%'
                    }}
                >
                    {getStatus === 'completed' ? (
                        <ProductForm onSubmit={handleSubmit} product={product} />
                    ) : (
                        <List />
                    )}
                </Card>
            </Box>
        </Box>
    );
}

export default EditProduct;