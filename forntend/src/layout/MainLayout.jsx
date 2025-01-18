import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'


const MainLayout = () => {


  return (
    
    <Box>
         <Header />
         
        <Outlet />
      
    </Box>
  )
}

export default MainLayout
