
import {useSelector } from 'react-redux';
import { selectToken } from '../features/User/UserSlice'
import {Navigate} from 'react-router-dom'
import PropTypes from 'prop-types';


const ProtectedRoutes = ({children}) => {

    const accessToken = useSelector(selectToken);

  return accessToken ? children : <Navigate to="/login" replace={true} />;
}


ProtectedRoutes.propTypes = {
  children: PropTypes.node
};

export default ProtectedRoutes
