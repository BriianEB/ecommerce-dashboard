import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Card, Fade, InputAdornment, InputBase, MenuItem, Popper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';


function TableSearch({ fields, onSelect }) {    
    const { t } = useTranslation();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [term, setTerm] = useState(null);
    
    const inputRef = useRef(null);

    const open = Boolean(anchorEl);

    function handleChange(event) {
        if (event.target.value.length !== 0) {
            setAnchorEl(inputRef.current);
            setTerm(event.target.value);
        } else {
            setAnchorEl(null);

            // También se dispara el evento onSelect para que la tabla
            // se filtre sin ningún término (es decir, que muestre todas
            // las filas)
            onSelect(undefined);
        }
    }

    function handleBlur() {
        setAnchorEl(null);
    }

    function handleFocus(event) {
        if (event.target.value.length !== 0) {
            setAnchorEl(inputRef.current);
        }
    }

    function selectOption(option) {
        onSelect({
            field: option,
            value: term
        });
    }    

    return (
        <>
            <InputBase
                ref={inputRef}
                fullWidth
                placeholder={t('table.search')}            
                startAdornment={(
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                )}
                sx={{
                    fontSize: 'body2.fontSize',
                    borderBottom: `1px solid ${alpha('#000', 0.42)}`
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
            />
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Card
                            sx={{
                                minWidth: '160px',
                                mt: 1,
                                p: 1,
                                '& .MuiMenuItem-root': {
                                    p: 1
                                },
                                '& .MuiSvgIcon-root': {
                                    mr: 2
                                },
                                boxShadow: (theme) => `0 0 25px 0 ${alpha(theme.palette.grey[500], 0.4)}`
                            }}
                        >
                            {fields.map((option) => (
                                <MenuItem key={option.key} onClick={() => selectOption(option.key)}>
                                    <Typography variant="body2">
                                        {t('table.search')}&nbsp;
                                        <Box
                                            component="span"
                                            sx={{ fontStyle: 'italic' }}
                                        >
                                            {option.label}
                                        </Box>
                                            &nbsp;{t('table.withValue')}&nbsp;
                                        <Box
                                            component="span"
                                            sx={{ color: 'secondary.main' }}
                                        >
                                            {term}
                                        </Box>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Card>
                    </Fade>
                )}
            </Popper>
        </>
    );
}

export default TableSearch;