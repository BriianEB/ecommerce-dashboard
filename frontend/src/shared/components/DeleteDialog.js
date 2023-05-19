import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Typography
} from '@mui/material';


function DeleteDialog({ name, open, onClose, onDelete }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText>
                    Are you sure to delete {name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={onClose}
                >
                    <Typography variant="body">Cancel</Typography>
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onDelete}
                >
                    <Typography variant="body">Delete</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;