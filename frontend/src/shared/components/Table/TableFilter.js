import { useTranslation } from "react-i18next";
import { Button } from '@mui/material';

import FilterAltIcon from '@mui/icons-material/FilterAlt';


function TableFilter() {
    const { t } = useTranslation();

    return (
        <Button
            color="secondary"
            variant="contained"
            size="extraSmall"
            startIcon={<FilterAltIcon />}   
            sx={{ mr: 1.5 }}                                 
        >
            {t('table.filter')}
        </Button>
    );
}

export default TableFilter;