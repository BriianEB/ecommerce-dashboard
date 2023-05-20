import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonBase, MenuItem, Popover, Typography } from '@mui/material';

import { resources as lngs } from 'shared/i18n';

import mexico from 'assets/images/mexico.png';
import usa from 'assets/images/usa.png';

const flags = {
    en: usa,
    es: mexico
}


function Language() {
    const { i18n } = useTranslation();

    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleChangeLanguage(lng) {
        i18n.changeLanguage(lng);
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <ButtonBase onClick={handleClick}>
                <img
                    alt={lngs[i18n.resolvedLanguage].name}
                    src={flags[i18n.resolvedLanguage]}
                    style={{
                        width: '16px',
                        height: '12px'
                    }}
                />
                <Typography sx={{ ml: 1 }}>
                    {lngs[i18n.resolvedLanguage].name}
                </Typography>
            </ButtonBase>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
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
                {Object.keys(lngs).map((lng) => (
                    <MenuItem
                        key={lng}
                        sx={{ px: 2 }}
                        onClick={() => handleChangeLanguage(lng)}
                    >
                        <img
                            alt={lngs[lng].name}
                            src={flags[lng]}
                            style={{
                                width: '16px',
                                height: '12px'
                            }}
                        />
                        <Typography sx={{ ml: 1 }}>
                            {lngs[lng].name}
                        </Typography>
                    </MenuItem>
                ))}
            </Popover>            
        </>
    );
}

export default Language;