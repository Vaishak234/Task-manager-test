import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRefresh } from '../features/User/UserActions';



const useRefreshToken = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const refresh = async () => {
        try {
            const response = await dispatch(getRefresh()).unwrap()
            
            return response?.accessToken
        } catch (error) {
            console.log(error);
            navigate('/login', { replace: true })
        }
    }

    return refresh
}

export default useRefreshToken
