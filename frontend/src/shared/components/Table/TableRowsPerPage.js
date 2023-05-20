import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Input, Typography } from '@mui/material';


function TableRowsPerPage({ rowsCount, onChange, defaultValue }) {
    const { t } = useTranslation();

    const [input, setInput] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(defaultValue);

    // Cuando el número de filas cambia dinámicamente (comúnmente cuando se
    // filtran), se debe re-evaluar el número de filas a mostrar.
    useEffect(function () {
        if (defaultValue > rowsCount) {
            setRowsPerPage(rowsCount);
        } else {
            setRowsPerPage(defaultValue);
        }        
    }, [defaultValue, rowsCount]);

    function handleChange(event) {
        setRowsPerPage(event.target.value);
    }

    function handleClick() {
        setInput(true);
    }

    function handleBlur() {
        saveValue();
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            saveValue();
        }
    }

    function saveValue() {
        setInput(false);

        let value = parseInt(rowsPerPage, 10);

        if (!isNaN(value) && value > 0) {
            if (value > rowsCount) {
                value = rowsCount;
            }
            
            setRowsPerPage(value);
            onChange(value);
        } else {
            setRowsPerPage(defaultValue);
            onChange(defaultValue);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 3
            }}
        >
        <Typography variant="body2" sx={{ mr: 1 }}>
            {t('table.rowsPage')}
        </Typography>
        {input ? (
            <Input
                variant="standard"
                sx={{
                    width: '30px',
                    fontSize: 'body2.fontSize'
                }}
                onBlur={handleBlur}
                value={rowsPerPage}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoFocus
            />
        ) : (
            <Typography
                component={'span'}
                variant="body2"
                onClick={handleClick}
                sx={{
                    width: '30px',
                    cursor: 'pointer'
                }}
            >
                {rowsPerPage}
            </Typography>
        )}
        </Box>
    );
}

export default TableRowsPerPage;