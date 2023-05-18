import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button } from "@mui/material";

import { finishProgress } from 'store/progressBarSlice';


function Dashboard() {
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(finishProgress());
    }, [dispatch]);

    return (
        <>
            <Typography>hi</Typography>
            <Button variant="contained" sx={{bgColor: 'primary.light'}}>hi</Button>
            <Button variant="contained" sx={{bgColor: 'primary.main'}}>hi</Button>
            <Button variant="contained" sx={{bgColor: 'primary.dark'}}>hi</Button>
        </>
    );
}

export default Dashboard;