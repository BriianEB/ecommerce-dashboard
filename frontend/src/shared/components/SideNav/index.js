import { Box, Drawer, List } from '@mui/material';

import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from 'assets/images/logo.png';

import NavItem from './NavItem';


const items = [
    { path: '/', name: 'Dashboard', icon: DashboardIcon },
    { path: 'orders', name: 'Orders', icon: ContentPasteIcon },
    { path: 'products', name: 'Products', icon: ShoppingBagIcon }

];

function SideNav({ isOpen, onCloseSideNav }) {
    return (
        <Drawer
            variant="persistent"
            open={isOpen}
            PaperProps={{
                sx: {
                    backgroundColor: 'menu.bg',
                    width: '260px',
                }
            }}
            onClose={onCloseSideNav}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 4,
                    pb: 4

                }}
            >
                <Box component="span" sx={{display: 'inline-block'}}>
                    <img
                        alt="logo"
                        src={logo}
                        style={{
                            width: '75px',
                            height: '75px'
                        }}
                    />
                </Box>
            </Box>
            <Box>
                <List sx={{ px: 2 }}>
                    { items.map((item) => (
                        <NavItem
                            key={item.path}
                            path={item.path}
                            text={item.name}
                            Icon={item.icon}
                        />
                    ))}                                                               
                </List>
            </Box>
        </Drawer>
    );
}

export default SideNav;