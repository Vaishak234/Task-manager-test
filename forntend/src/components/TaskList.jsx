import { Box, Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosPrivate } from '../axios/axiosPrivate'
import { selectAllTasks, setAllTasks } from '../features/Task/TaskSlice'
import TaskCard from './TaskCard'

const TaskList = () => {

    const dispatch = useDispatch()
    const tasks = useSelector(selectAllTasks)

   
    const filterTasks = async (priority) =>{

        try {
            const response = await axiosPrivate.get('/task/search',{
                params: {
                    priority:priority
                }
            })

            if(response?.data?.data){
                dispatch(setAllTasks(response.data.data))
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {

        const fetchTasks = async () => {
            try {
                let { data } = await axiosPrivate.get('/task')

                dispatch(setAllTasks(data.data))

            } catch (error) {
                console.log(error);

            }
        }

        fetchTasks()

    }, [dispatch])


    return (
        <Box sx={{p:2 , width:'100%'}}>

            <Box sx={{display:'flex',alignItems:'center' , justifyContent:'end',gap:2}}>
                <Button variant='contained' sx={{bgcolor:'white',color:'black'}} onClick={()=>filterTasks('')} >All</Button>
                <Button variant='contained' sx={{ bgcolor: 'white', color: 'black' }} onClick={() => filterTasks('high')}>High</Button>
                <Button variant='contained' sx={{ bgcolor: 'white', color: 'black' }} onClick={() => filterTasks('medium')}>Medium</Button>
                <Button variant='contained' sx={{ bgcolor: 'white', color: 'black' }} onClick={() => filterTasks('low')}>Low</Button>
            </Box>

            

            <Box sx={{ display: 'flex', alignItems: "center", alignContent: "start", flexWrap: "wrap", p: 4, gap: 2, flex: 1 }}>
            {
                tasks.length > 0 ?
                    (
                        tasks.map((task, index) => (
                            <TaskCard key={index} task={task} />
                         ))
                    )
                    :

                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <p>No tasks available</p>
                    </Box>
            }
            </Box>
        </Box>
    )
}

export default TaskList
