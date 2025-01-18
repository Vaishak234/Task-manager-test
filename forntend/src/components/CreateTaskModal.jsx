import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';
import { taskSchema } from "../schema/taskSchema";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../axios/axiosPrivate";
import { addTask } from "../features/Task/TaskSlice";
import { priorityOptions, statusOptions } from "../utils/selectOptions";



const CreateTaskModal = ({ open, handleClose }) => {

    const dispatch = useDispatch()

    const initialValues = {
        title: '',
        description: '',
        status: '',
        priority: '',
        dueDate: ''
    }

    

    const onSubmit = async (values) => {
        try {
        
            const response = await axiosPrivate.post('/task',values)
           
            if(response?.data?.data){
                
                dispatch(addTask(response.data.data))
                handleClose()
            }
            
          
        } catch (error) {
            console.log(error);
            
        }

    }

    const { values, handleBlur, handleChange, isSubmitting, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: taskSchema,
        onSubmit,
        validateOnBlur: true,
        validateOnChange: true,
    });


    

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Create Task
                <IconButton onClick={handleClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent >
                <Box component={'form'} onSubmit={handleSubmit}>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            variant="outlined"
                            label="Title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />
                        <TextField
                            variant="outlined"
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />

                       

                        <TextField
                            select
                            variant="outlined"
                            label="Status"
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.status && Boolean(errors.status)}
                            helperText={touched.status && errors.status}
                        >
                            <MenuItem value="" disabled>
                                Select Status
                            </MenuItem>
                            {statusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                       
                        <TextField
                            select
                            variant="outlined"
                            label="Priority"
                            name="priority"
                            value={values.priority}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.priority && Boolean(errors.priority)}
                            helperText={touched.priority && errors.priority}
                        >
                            <MenuItem value="" disabled>
                                Select Priority
                            </MenuItem>
                            {priorityOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            variant="outlined"
                            type="date"
                            name="dueDate"
                            value={values.dueDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.dueDate && Boolean(errors.dueDate)}
                            helperText={touched.dueDate && errors.dueDate}
                        />

                        <Button color="primary" variant="contained" type="submit">
                            {isSubmitting ? 'Submitting....' : 'Submit'}
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions />
        </Dialog>
    );
};

CreateTaskModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default CreateTaskModal;