import { useTranslation } from "react-i18next";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Typography
} from '@mui/material';


function DeleteDialog({ name, open, onClose, onDelete }) {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText>
                    {t('actions.deleteConfirmation', { name: name })}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={onClose}
                >
                    <Typography variant="body">{t('actions.cancel')}</Typography>
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onDelete}
                >
                    <Typography variant="body">{t('actions.delete')}</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;