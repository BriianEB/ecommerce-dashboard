import { Typography, Button } from "@mui/material";

function Dashboard() {    
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