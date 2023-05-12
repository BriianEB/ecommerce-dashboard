import { InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';


function TableSearch() {
    return (
        <TextField
            fullWidth
            variant="standard"
            InputProps={{
                sx: { fontSize: 'body2.fontSize' },
                placeholder: 'Search',
                
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                )
            }}
        />
    );
}

export default TableSearch;