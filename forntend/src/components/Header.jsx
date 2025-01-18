import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', borderBottom: '2px solid #0000009f' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', }}>
                    <Typography variant="h6" fontWeight={'bold'} color="inherit">Task Manager</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
