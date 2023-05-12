import { Button } from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';


function TableExport() {
    return (
        <Button
            color="secondary"
            variant="contained"
            size="extraSmall"
            startIcon={<DownloadIcon />}
        >
            Export
        </Button>
    );
}

export default TableExport;