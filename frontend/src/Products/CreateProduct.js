import { useEffect } from 'react';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Card, Typography } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';
import { notifySuccess } from 'store/notificationSlice';

import { api } from 'shared/utils/apiRequest';


function CreateProduct() {
    const action = useActionData();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = useSubmit();

    useEffect(function () {
        if (action?.state === 'success') {
            dispatch(notifySuccess('Product created successfully'));
            navigate('/products');
        }   
    }, [action, dispatch, navigate]);

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
                <Typography variant="h6">Create Product</Typography>
                <Breadcrumbs
                    links={[
                        { name: 'Dashboard', path: '/' },
                        { name: 'Products', path: '/products' },
                        { name: 'Create Product', path: '/products/create' }
                    ]}
                />
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