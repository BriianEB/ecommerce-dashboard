import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Card, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';
import { notifySuccess } from 'store/notificationSlice';


function CreateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [createProduct, reqStatus, product, reqErrors] = useApi.post('/products');

    useEffect(function () {
        if (reqStatus === 'completed') {
            dispatch(notifySuccess('Product created succesfully'));
            navigate('/products');
        }
    }, [reqStatus, navigate, dispatch]);

    if (reqErrors) {
        console.log(reqErrors);
    }

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

export default CreateProduct;