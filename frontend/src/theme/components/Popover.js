const MuiPopover = {
    styleOverrides: {
        paper: function ({ theme }) {
            return {
                boxShadow: theme.customShadows.popover
            };
        }
    }
}

export default MuiPopover;