const MuiCard = {
    styleOverrides: {
        root: function ({ theme }) {
            return {
                boxShadow: theme.customShadows.card
            };
        }
    }
};

export default MuiCard;