import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import ProductForm from './ProductForm';


function EditProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const productId = params.id;
    
    const [getProduct, getStatus, product, getErrors] = useApi.get(`/products/${productId}`);
    const [patchProduct, patchStatus, updatedProduct, patchErrors] = useApi.patch(`/products/${productId}`);

    useEffect(function () {
        getProduct();
    }, [getProduct]);

    useEffect(function () {
        if (patchStatus === 'completed') {
            navigate('/products');
        }
    }, [patchStatus, navigate]);

    if (getErrors) {
        console.log(getErrors);
    }

    if (patchErrors) {
        console.log(patchErrors);
    }

    function handleSubmit(data) {
        patchProduct(data);
    }

    if (getStatus !== 'completed') {
        return null;
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

export default EditProduct;