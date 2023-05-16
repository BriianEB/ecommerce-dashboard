import { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    MenuItem,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import useApi from 'shared/hooks/useApi';


function DeleteRowAction({ rowName, apiUri, onDelete }) {
    const [open, setOpen] = useState(false);

    const [deleteRow, reqStatus, response, reqErrors] = useApi.delete(apiUri);

    useEffect(function () {
        if (reqStatus === 'completed') {
            onDelete(response);
        }
    }, [reqStatus, onDelete, response]);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function confirmDelete() {
        deleteRow();
        setOpen(false);
    }

    if (reqErrors) {
        console.log(reqErrors);
    }

    return (
        <>
            <MenuItem onClick={handleClickOpen}>
                <DeleteIcon fontSize="small" />
                <Typography variant="body2">Delete</Typography>
            </MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete {rowName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleClose}
                    >
                        <Typography variant="body">Cancel</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={confirmDelete}
                    >
                        <Typography variant="body">Delete</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteRowAction;