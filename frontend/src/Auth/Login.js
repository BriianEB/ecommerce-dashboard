import { useEffect } from 'react';
import { useActionData, useSubmit, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Box, Button, Card, TextField, Typography } from '@mui/material';

import { login } from 'store/authSlice';
import { api } from 'shared/utils/apiRequest';
import { setSession } from 'shared/utils/auth';

import logo from 'assets/images/logo.png';


const validations = {
    email: {
        required: {
            value: true,
            message: 'This field is required'
        },
        pattern: {
            value: /[\w-]+@[\w]+\.[\w]+/,
            message: 'Must be a valid email'
        }
    },
    password: {
        required: {
            value: true,
            message: 'This field is required'
        }
    }

};

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = useSubmit();

    const action = useActionData();
    
    useEffect(function () {        
        if (action?.state === 'success') {
            /**
             * Para la sesión se usa el siguiente enfoque con propósitos de
             * simplicidad:
             * Se usan dos tokens: un access token y un refresh token. El access
             * token se guarda en memoria (lo que significa que se pide un nuevo
             * token cada que se recarga la página o cuando éste expira), y el
             * refresh token se guarda en el local storage.
             */            
            const {
                access_token,
                access_token_exp_time,
                refresh_token,
                user
            } = action.data;

            dispatch(login({
                user: user,
                token: access_token,
                expiration: access_token_exp_time

            }));

            setSession(refresh_token);

            navigate('/');
        }
    }, [action, dispatch, navigate]);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function onSubmit(data) {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        
        submit(formData, { method: 'post' });
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'                
            }}
        >
            <Card sx={{ px: 4, py: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 4
                    }}
                >
                    <img
                        alt="logo"
                        src={logo}
                        style={{
                            width: '75px',
                            height: '75px'
                        }}
                    />
                </Box>
                <Alert severity="info" sx={{my: 2}}>
                    Use email <strong>admin@test.com</strong> and password <strong>admin</strong>
                </Alert>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        rules={validations.email}
                        render={({ field }) => (
                            <TextField
                                label="Email Address"
                                fullWidth
                                error={errors.email !== undefined}
                                helperText={errors.email && errors.email.message}
                                sx={{ mb: 3 }}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={validations.password}
                        render={({ field }) => (
                            <TextField
                                label="Password"
                                fullWidth
                                error={errors.password !== undefined}
                                helperText={
                                    errors.password && errors.password.message
                                }
                                {...field}
                            />
                        )}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            pt: 5
                        }}
                    >                        
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{width: '100%'}}
                        >
                            <Typography variant="body">Sign in</Typography>
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
}

export async function action({ request }) {
    const formData = await request.formData();

    const response = await api.post('/auth/login', {
        email: formData.get('email'),
        password: formData.get('password')
    });

    return {
        state: 'success',
        data: response
    };
}

export default Login;