const Table = {
    MuiTableRow: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    
                }
            })
        }
    }
};