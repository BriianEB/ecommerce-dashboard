import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';


function EditProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const [editProduct, reqStatus, product, reqErrors] = useApi.patch('/products/');

    const productId = params.id;

    useEffect(function () {
        if (reqStatus === 'completed') {
            navigate('/products');
        }
    }, [reqStatus, navigate, product]);

    if (reqErrors) {
        console.log(reqErrors);
    }

    function handleSubmit(data) {
        editProduct(data);
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
                        { name: 'Edit Product', path: '/products/create' }
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

export default EditProduct;