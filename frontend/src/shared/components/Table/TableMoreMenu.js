import { useState } from 'react';
import { IconButton, Popover } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';


function TableMoreMenu({ row, actions }) {
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
                {actions(row)}
            </Popover>
        </>
    );
}

export default TableMoreMenu;