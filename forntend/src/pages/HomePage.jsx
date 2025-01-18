import { Box } from "@mui/material"
import Sidebar from "../components/Sidebar"
import TaskList from "../components/TaskList"

const HomePage = () => {

  return (
    <Box>
       
       <Box sx={{display:"flex" ,minHeight:"100vh", width:"100%" ,bgcolor:"primary.main"}} >


           <Sidebar />

           <TaskList />

       </Box>


    </Box>
  )
}

export default HomePage
