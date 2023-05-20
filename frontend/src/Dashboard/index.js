import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";


function Dashboard() {
    const { t } = useTranslation();
    
    return (
        <>
            <Typography>{t('dashboard.greeting')}</Typography>            
        </>
    );
}

export default Dashboard;