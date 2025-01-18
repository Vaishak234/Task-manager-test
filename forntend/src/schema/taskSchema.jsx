
import * as yup from 'yup';

export const taskSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    status: yup.string().oneOf(['pending', 'progress', 'completed'], 'Invalid status').required('Status is required'),
    priority: yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required('Priority is required'),
    dueDate: yup.date().required('Due date is required').nullable(),
});

