import store from '../features/store'; 

export const getAccessToken = () => {
  const state = store.getState();  
  
  const accessToken =  state.user.accessToken

  return accessToken;
};