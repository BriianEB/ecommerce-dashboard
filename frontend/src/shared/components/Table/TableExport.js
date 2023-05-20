import { useTranslation } from "react-i18next";
import { Button } from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';


function TableExport() {
    const { t } = useTranslation();

    return (
        <Button
            color="secondary"
            variant="contained"
            size="extraSmall"
            startIcon={<DownloadIcon />}
        >
            {t('table.export')}
        </Button>
    );
}

export default TableExport;