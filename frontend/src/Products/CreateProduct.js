import { useEffect } from 'react';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { Box, Card, Typography } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';
import { notifySuccess } from 'store/notificationSlice';

import { api } from 'shared/utils/apiRequest';


function CreateProduct() {    
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const submit = useSubmit();

    const action = useActionData();

    useEffect(function () {
        if (action?.state === 'success') {
            dispatch(notifySuccess(
                `${t('products.product.product')} ${t('actions.createSuccess')}`
            ));
            
            navigate('/products');
        }   
    }, [action, dispatch, navigate, t]);

    function handleSubmit(data) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        
        submit(formData, { method: 'patch' });
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

export async function action({ request }) {
    const formData = await request.formData();

    await api.post('/products', {
        name: formData.get('name'),
        price: formData.get('price')
    });

    return {
        state: 'success'
    };
}

export default CreateProduct;