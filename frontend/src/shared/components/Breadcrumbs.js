import { Box, Breadcrumbs as MUIBreadCrumbs, Link, Typography } from '@mui/material';


function Breadcrumbs({ links, heading }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 2.5
            }}
        >
            <Typography variant="h6">{heading}</Typography>
            <Box>
                <MUIBreadCrumbs separator={<BreadcrumbsSeparator />}>
                    {links.map(link => (
                        <Link key={link.path} href={link.path}>
                            {link.name}
                        </Link>
                    ))}                    
                </MUIBreadCrumbs>
            </Box>
        </Box>
    );
}

function BreadcrumbsSeparator() {
    return (
        <Box
            component="span"
            sx={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                bgcolor: 'text.disabled'
            }}
        />
    );
}

export default Breadcrumbs;