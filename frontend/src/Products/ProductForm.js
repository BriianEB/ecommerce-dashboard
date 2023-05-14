import { useForm, Controller } from 'react-hook-form';

import { Button, Box, Typography } from '@mui/material';
import SmallTextField from 'shared/components/SmallTextField';


const validations = {
    name: {
        required: {
            value: true,
            message: 'You must fill this field'
        }
    },
    price: {
        required: {
            value: true,
            message: 'You must fill this field'
        }
    }

};

function ProductForm({ onSubmit, product }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: ''
        }
    });    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <Controller
                    name="name"
                    control={control}
                    rules={validations.name}
                    render={({ field }) => (
                        <SmallTextField
                            label="Name"
                            fullWidth
                            sx={{
                                mb: 3
                            }}
                            {...field}
                            error={errors.name !== undefined}
                            helperText={errors.name && errors.name.message}
                            value={product && product.name}
                        />
                    )}
                />
                
                <Controller
                    name="price"
                    control={control}
                    rules={validations.price}
                    render={({ field }) => (
                        <SmallTextField
                            label="Price"
                            fullWidth
                            {...field}
                            error={errors.price !== undefined}
                            helperText={errors.price && errors.price.message}
                            value={product && product.price}
                        />
                    )}
                />                
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    pt: 5
                }}
            >
                <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                        mr: 1
                    }}
                    href=".."
                >
                    <Typography variant="body">Cancel</Typography>
                </Button>
                <Button type="submit" variant="contained">
                    <Typography variant="body">Add Product</Typography>
                </Button>
            </Box>
        </form>
    );
}

export default ProductForm;