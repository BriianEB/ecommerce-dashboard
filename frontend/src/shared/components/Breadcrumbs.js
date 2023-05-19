import { Box, Breadcrumbs as MUIBreadCrumbs, Link, Typography } from '@mui/material';

import { useMatches } from "react-router-dom";


function Breadcrumbs() {    
    const matches = useMatches();
    
    const crumbs = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => match.handle.crumb(match.data));

    const currentCrumb = crumbs[crumbs.length - 1].name;

    return (
        <MUIBreadCrumbs separator={<BreadcrumbsSeparator />} sx={{m:0}}>
            {crumbs.map((crumb, index) => (
                <div key={index}>
                    {crumb.name !== currentCrumb ? (
                        <Link key={crumb.path} href={crumb.path}>
                            <Typography variant="body2">{crumb.name}</Typography>
                        </Link>
                    ) : (
                        <Typography variant="body2">{crumb.name}</Typography>
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