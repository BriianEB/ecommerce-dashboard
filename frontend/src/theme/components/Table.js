const MuiTable = {
    MuiTableRow: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover
                    }
                }
            })
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: ({ theme }) => ({
                backgroundColor: theme.palette.grey[250],
                borderBottom: 'none',
                '&:first-of-type': {
                    borderTopLeftRadius: theme.shape.borderRadius,
                },
                '&:last-of-type': {
                    borderTopRightRadius: theme.shape.borderRadius,
                }
            })
        }
    },
    MuiTableSortLabel: {
        styleOverrides: {
            root: {
                display: 'flex',
                justifyContent: 'space-between'
            }
        }
    }
};

export default MuiTable;