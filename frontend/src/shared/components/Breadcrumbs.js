import { Box, Breadcrumbs as MUIBreadCrumbs, Link, Typography } from '@mui/material';


function Breadcrumbs({ links }) {
    const currentLink = links[links.length - 1].name;

    return (
        <MUIBreadCrumbs separator={<BreadcrumbsSeparator />} sx={{m:0}}>
            {links.map(link => (
                <div key={link.name}>
                    {link.name !== currentLink ? (
                        <Link key={link.path} href={link.path}>
                            <Typography variant="body2">{link.name}</Typography>
                        </Link>
                    ) : (
                        <Typography variant="body2">{link.name}</Typography>
                    )}
                </div>
            ))}                    
        </MUIBreadCrumbs>
    );
}

function BreadcrumbsSeparator() {
    return (
        <Box
            component="span"
            sx={{
                width: 4,
                height: 4,
                mx: 1,
                borderRadius: '50%',
                bgcolor: 'text.disabled'
            }}
        />
    );
}

export default Breadcrumbs;