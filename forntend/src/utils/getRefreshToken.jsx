import { getRefresh } from "../features/User/UserActions";
import  store  from '../features/store'; 



export const getRefreshToken = async() => {
  const response = await store.dispatch(getRefresh());
  
  return response.payload.accessToken;
};