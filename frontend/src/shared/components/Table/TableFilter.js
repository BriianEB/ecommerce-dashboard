import { Button } from '@mui/material';

import FilterAltIcon from '@mui/icons-material/FilterAlt';


function TableFilter() {
    return (
        <Button
            color="secondary"
            variant="contained"
            size="extraSmall"
            startIcon={<FilterAltIcon />}   
            sx={{ mr: 1.5 }}                                 
        >
            Filter
        </Button>
    );
}

export default TableFilter;