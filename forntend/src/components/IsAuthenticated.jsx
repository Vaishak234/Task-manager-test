import { useSelector } from 'react-redux';
import { selectToken } from '../features/User/UserSlice';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const IsAuthenticated = ({ children }) => {
    const accessToken = useSelector(selectToken);

    return accessToken ? <Navigate to="/" replace={true}/> : children;
};

IsAuthenticated.propTypes = {
    children: PropTypes.node
};

export default IsAuthenticated;
