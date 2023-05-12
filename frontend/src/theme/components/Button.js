const MuiButton = {
    styleOverrides: {
        root: ({ ownerState, theme }) => ({
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': {
                boxShadow: 'none'
            },
            ...(ownerState.size === 'extraSmall' && {
                paddingTop: '1px',
                paddingBottom: '1px',
                paddingLeft: theme.spacing(1.5),
                paddingRight: theme.spacing(1.5),
                fontSize: theme.typography.body3.fontSize,
                fontWeight: 400,
                '& .MuiButton-startIcon': {
                    marginRight: theme.spacing(0.25)
                },
                '& .MuiSvgIcon-root': {
                    fontSize: theme.typography.body2.fontSize,
                    '&:nth-of-type(1)': {
                        fontSize: ''
                    }
                }
            })
        })
    }
};

export default MuiButton;