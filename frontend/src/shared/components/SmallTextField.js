import { forwardRef } from 'react';
import { TextField } from '@mui/material';


const SmallTextField = forwardRef(function SmallTextField(props, ref) {
    return (
        <TextField
            {...props}
            size="small"
            InputLabelProps={{
                sx: {
                    fontSize: 'body2.fontSize'
                }
            }}
            InputProps={{
                sx: {
                    fontSize: 'body2.fontSize'
                }
            }}
            ref={ref}
        />
    );
});

export default SmallTextField;