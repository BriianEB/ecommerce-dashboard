import { useEffect } from 'react';
import { useActionData, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Card, Typography } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';

import { notifySuccess } from 'store/notificationSlice';

import { api } from 'shared/utils/apiRequest';


function EditProduct() {
    const product = useLoaderData();
    const action = useActionData();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = useSubmit();

    useEffect(function () {
        if (action?.state === 'success') {
            dispatch(notifySuccess('Product updated succesfully'));
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
                <Typography variant="h6">Edit Product</Typography>
                <Breadcrumbs
                    links={[
                        { name: 'Dashboard', path: '/' },
                        { name: 'Products', path: '/products' },
                        { name: 'Edit Product', path: `/products/${product.id}/edit` }
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
                    <ProductForm onSubmit={handleSubmit} product={product} />
                </Card>
            </Box>
        </Box>
    );
}

export function loader({ params }) {
    return api.get(`/products/${params.id}`);
}

export async function action({ request, params }) {            
    const formData = await request.formData();

    await api.patch(`/products/${params.id}`, {
        name: formData.get('name'),
        price: formData.get('price')
    });
    
    return {
        state: 'success'
    };
}

export default EditProduct;