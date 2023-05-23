import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation, Trans } from "react-i18next";
import { Alert, Box, Button, Card, TextField, Typography } from '@mui/material';

import useApi from 'shared/hooks/useApi';
import useDeepMemo from 'shared/hooks/useDeepMemo';
import { login } from 'store/authSlice';
import { setSession } from 'shared/utils/auth';

import logo from 'assets/images/logo.png';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loginReq, reqStatus, response, reqErrors] = useApi.post('/auth/login');
    
    useEffect(function () {
        if (reqStatus === 'completed') {
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
            } = response;

            dispatch(login({
                user: user,
                token: access_token,
                expiration: access_token_exp_time

            }));

            setSession(refresh_token);

            navigate('/');
        }
    }, [reqStatus, response, dispatch, navigate]);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function onSubmit(data) {
        loginReq(data);
    }

    if (reqErrors) {
        console.log(reqErrors);
    }

    const validations = useDeepMemo({
        email: {
            required: {
                value: true,
                message: t('validations.required')
            },
            pattern: {
                value: /[\w-]+@[\w]+\.[\w]+/,
                message: t('validations.email')
            }
        },
        password: {
            required: {
                value: true,
                message: t('validations.required')
            }
        }
    
    });

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
                    <Trans i18nKey="auth.demo">
                        Use email <strong>admin@test.com</strong> and password <strong>admin</strong>
                    </Trans>
                </Alert>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        rules={validations.email}
                        render={({ field }) => (
                            <TextField
                                label={t('auth.email')}
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
                                label={t('auth.password')}
                                type="password"
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
                            <Typography variant="body">{t('auth.signIn')}</Typography>
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
}

export default Login;