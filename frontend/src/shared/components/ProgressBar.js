import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import { useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';


function ProgressBar() {
    const [progress, setProgress] = useState(false);
    const [prevLoc, setPrevLoc] = useState('');
    const location = useLocation();
    const theme = useTheme();

    const path = location.pathname;

    useEffect(function () {
        setPrevLoc(path);
        setProgress(true);

        if (path === prevLoc) {
            setPrevLoc('');
        }

    }, [path]);

    useEffect(function () {
        setProgress(false);
    }, [prevLoc]);

    if (progress) {
        NProgress.start();
    } else {
        NProgress.done();
    }

    return (
        <GlobalStyles
            styles={{
                '#nprogress': {
                    pointerEvents: 'none',
                    '& .bar': {
                        top: 0,
                        left: 0,
                        height: 2,
                        width: '100%',
                        position: 'fixed',
                        zIndex: theme.zIndex.snackbar,
                        backgroundColor: theme.palette.primary.main,
                        boxShadow: `0 0 2px ${theme.palette.primary.main}`
                    },
                    '& .peg': {
                        right: 0,
                        opacity: 1,
                        width: 100,
                        height: '100%',
                        display: 'block',
                        position: 'absolute',
                        transform: 'rotate(3deg) translate(0px, -4px)',
                        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
                    }
                }
            }}
        />    
    );
}

export default ProgressBar;