import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { alpha, useTheme } from '@mui/material/styles';


function NavItem({ text, Icon, path }) {
    const theme = useTheme();
    
    return (
        <ListItemButton
            sx={{
                color: 'menu.item',
            }}
            href={path}
            style={({ isActive }) => ({
                backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.16) : '',
                color: isActive ? theme.palette.primary.main : '',
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                marginBottom: theme.spacing(1),
                borderRadius: theme.shape.borderRadius,
                fontWeight: isActive ? theme.typography.fontWeightBold : ''
            })}
            navLink
        >
            <ListItemIcon>
                <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText
                primary={text}
                primaryTypographyProps={{
                    variant: 'body2',
                    color: 'inherit',
                    fontWeight: 'inherit'
                }}
            />
        </ListItemButton>
    );
}

export default NavItem;