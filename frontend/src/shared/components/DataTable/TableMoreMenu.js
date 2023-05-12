import { useState } from 'react';
import { IconButton, MenuItem, Popover, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import MoreVertIcon from '@mui/icons-material/MoreVert';


function TableMoreMenu({ onClose, onEdit, onDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        minWidth: '160px',
                        p: 1,
                        '& .MuiMenuItem-root': {
                            p: 1
                        },
                        '& .MuiSvgIcon-root': {
                            mr: 2
                        }
                    }
                }}
            >
                <MenuItem onClick={onEdit}>
                    <EditIcon fontSize="small" />
                    <Typography variant="body2">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={onDelete}>
                    <DeleteIcon fontSize="small" />
                    <Typography variant="body2">Delete</Typography>
                </MenuItem>
            </Popover>
        </>
    );
}

export default TableMoreMenu;