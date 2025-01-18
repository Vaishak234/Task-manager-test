import { Box, Button } from "@mui/material"
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import DescriptionIcon from '@mui/icons-material/Description';
 import TaskIcon from '@mui/icons-material/Task';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from "../hooks/useLogout";
import { setAllTasks } from "../features/Task/TaskSlice";
import { axiosPrivate } from "../axios/axiosPrivate";
import { useDispatch } from "react-redux";
import LoopIcon from '@mui/icons-material/Loop';
import TimelapseIcon from '@mui/icons-material/Timelapse';

const Sidebar = () => {


    const {logout} = useLogout()

  const [isModalOpen ,setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () =>{
    setIsModalOpen(prev => !prev)
  }

   const filterTasks = async (status) =>{
  
          try {
              const response = await axiosPrivate.get('/task/search',{
                  params: {
                      status:status
                  }
              })
  
              if(response?.data?.data){
                  dispatch(setAllTasks(response.data.data))
              }
              
          } catch (error) {
              console.log(error);
              
          }
      }

  return (

    <>
      <Box sx={{ display: 'flex',flexDirection: 'column', height: '100vh', maxWidth: "260px", width:'100%',p:2, bgcolor: 'background.paper' }}>

          
          <List
              sx={{ p:1  }}
              component="nav"
          >
              <Button sx={{bgcolor:'primary.main',color:'white',width:'100%'}} onClick={()=>setIsModalOpen(true)}>Create a Task</Button>

             
                  <ListItemButton sx={{ mt: 2 }} onClick={() => filterTasks('')}>
                  <ListItemIcon>
                      <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Tasks" />
              </ListItemButton>

                  <ListItemButton sx={{ mt: 2 }} onClick={() => filterTasks('completed')}>
                  <ListItemIcon>
                      <TaskIcon />
                  </ListItemIcon>
                  <ListItemText primary="Completed" />
              </ListItemButton>

                  <ListItemButton sx={{ mt: 2 }} onClick={() => filterTasks('progress')}>
                  <ListItemIcon>
                      <LoopIcon />
                  </ListItemIcon>
                  <ListItemText primary="Progress" />
              </ListItemButton>

                  <ListItemButton sx={{ mt: 2 }} onClick={() => filterTasks('pending')}>
                  <ListItemIcon>
                      <TimelapseIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pending" />
              </ListItemButton>



                <ListItemButton sx={{ mt: 2 }} onClick={logout}>
                  <ListItemIcon>
                          <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
              </ListItemButton>

                
           
          </List>
        
    </Box>

    {
        isModalOpen && <CreateTaskModal open={isModalOpen} handleClose={handleClose}/>
    }

    </>
  )
}

export default Sidebar
