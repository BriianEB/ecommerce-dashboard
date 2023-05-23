import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { Box, Card, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';
import { notifySuccess } from 'store/notificationSlice';




function CreateProduct() {    
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [createProduct, reqStatus, product, reqErrors] = useApi.post('/products');

    useEffect(function () {
        if (reqStatus === 'completed') {
            dispatch(notifySuccess(
                `${t('products.product.product')} ${t('actions.createSuccess')}`
            ));
            navigate('/products');
        }
    }, [reqStatus, navigate, dispatch, t]);

    function handleSubmit(data) {
        createProduct(data);
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
                    {`${t('actions.create')} ${t('products.product.product')}`}
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
                    <ProductForm onSubmit={handleSubmit} />
                </Card>
            </Box>
        </Box>
    );
}

export default CreateProduct;