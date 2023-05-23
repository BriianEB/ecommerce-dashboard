import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { Button, Box, Typography } from '@mui/material';

import useDeepMemo from 'shared/hooks/useDeepMemo';
import SmallTextField from 'shared/components/SmallTextField';


function ProductForm({ onSubmit, product }) {
    const { t } = useTranslation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: product ? product.name : '',
            price: product ? product.price : ''
        }
    });

    const validations = useDeepMemo({
        name: {
            required: {
                value: true,
                message: t('validations.required')
            }
        },
        price: {
            required: {
                value: true,
                message: t('validations.required')
            },
            pattern: {
                value: /^[\d]+$/,
                message: t('validations.numeric')
            }
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
                            label={t('products.product.name')}
                            fullWidth
                            sx={{
                                mb: 3
                            }}
                            {...field}
                            error={errors.name !== undefined}
                            helperText={errors.name && errors.name.message}
                        />
                    )}
                />
                
                <Controller
                    name="price"
                    control={control}
                    rules={validations.price}
                    render={({ field }) => (
                        <SmallTextField
                            label={t('products.product.price')}
                            fullWidth
                            {...field}
                            error={errors.price !== undefined}
                            helperText={errors.price && errors.price.message}
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
                    <Typography variant="body">{t('actions.cancel')}</Typography>
                </Button>
                <Button type="submit" variant="contained">
                    <Typography variant="body">{t('actions.save')}</Typography>
                </Button>
            </Box>
        </form>
    );
}

export default ProductForm;