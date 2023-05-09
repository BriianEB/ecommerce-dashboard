import { forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';


const LinkBehavior = forwardRef(function (props, ref) {
    const { href, children, navLink, ...other} = props;

    if (navLink) {
        return (
            <NavLink ref={ref} to={href} {...other}>{children}</NavLink>
        );
    }

    return (
        <Link ref={ref} to={href} {...other}>{children}</Link>
    );
});

const MuiLink = {
    defaultProps: {
        component: LinkBehavior,
        underline: 'none'
    }
};

export { LinkBehavior, MuiLink as default };