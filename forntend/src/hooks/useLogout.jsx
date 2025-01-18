import  { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/User/UserActions';

const useLogout = () => {

    const dispatch = useDispatch()

    const logout = useCallback(async () => {
        try {
            let response = await dispatch(logoutUser()).unwrap()
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }, [dispatch])


    return {logout}
}

export default useLogout
