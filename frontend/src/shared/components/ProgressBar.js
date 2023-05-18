import { useSelector } from 'react-redux';
import NProgress from 'nprogress';
import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';


function ProgressBar() {
    const { progress } = useSelector((state) => state.progressBar);
    const theme = useTheme();

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