import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { axiosPrivate } from '../axios/axiosPrivate';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/Task/TaskSlice';
import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import PropTypes from 'prop-types';

export default function TaskCard({task}) {

    const dispatch = useDispatch()

    const [openEdit , setOpenEdit] = useState(false)

    const handleClose = () =>{
        setOpenEdit(prev=>!prev)
    }
        

     const deleteTaskFnc = async () => {
                try {
                    let { data } = await axiosPrivate.delete('/task/'+task._id)
                    console.log(data);
                    
                    if(data){

                        dispatch(deleteTask(task._id))
                    }
                    
                } catch (error) {
                    console.log(error);
    
                }
            }


    return (
        <> 
        <Card sx={{ maxWidth: 245 ,width:'100%'}}>
           
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                   {task.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    {task.description}
                </Typography>

                <Typography variant="body2" sx={{ mt:1,color: 'text.secondary' }}>
                    status: {task.status}
                </Typography>

                <Typography variant="body2" sx={{ mt:1,color: 'red' }}>
                    priority: {task.priority}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" variant='outlined' onClick={deleteTaskFnc}>delete</Button>
                <Button size="small" variant='contained' onClick={()=>setOpenEdit(true)} >Edit</Button>
            </CardActions>
        </Card>

        {
            openEdit && ( <EditTaskModal  open={openEdit} handleClose={handleClose} task={task}/> )
        }

        </>
    );
}


TaskCard.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
    }).isRequired,
};