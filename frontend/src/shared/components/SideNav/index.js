import { Box, Drawer, List } from '@mui/material';
import { useTranslation } from "react-i18next";

import useDeepMemo from 'shared/hooks/useDeepMemo';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from 'assets/images/logo.png';

import NavItem from './NavItem';


function SideNav({ isOpen, onCloseSideNav }) {
    const { t } = useTranslation();

    const items = useDeepMemo([
        { path: '/', name: t('dashboard.label'), icon: DashboardIcon },
        { path: 'orders', name: t('orders.label'), icon: ContentPasteIcon },
        { path: 'products', name: t('products.label'), icon: ShoppingBagIcon }
    
    ]);

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