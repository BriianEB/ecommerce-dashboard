import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert as MUIAlert, Slide, Snackbar } from '@mui/material';

import { close } from 'store/notificationSlice';


const Alert = forwardRef(function Alert(props, ref) {
    return (
        <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />
    );
});

function TransitionLeft(props) {
    return (
        <Slide {...props} direction="left" />
    );
}

function Notification() {    
    const { open, type, message } = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(close());
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;