import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';


function CreateProduct() {
    const navigate = useNavigate();
    const [createProduct, reqStatus, product, reqErrors] = useApi.post('/products');

    useEffect(function () {
        if (reqStatus === 'completed') {
            navigate('/products');
        }
    }, [reqStatus, navigate]);

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