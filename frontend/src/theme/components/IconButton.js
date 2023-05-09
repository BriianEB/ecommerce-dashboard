const MuiIconButton = {
    styleOverrides: {
        root: {
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            '&:hover': {
                transform: 'scale(1.1, 1.1)'
            }
        }
    }
};

export default MuiIconButton;