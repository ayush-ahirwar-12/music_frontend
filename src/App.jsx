import AppRouter from './router/AppRouter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { axiosInstance } from './axios/AxiosInstance';
import { addUser } from './features/reducers/authSlice.jsx';

const App = () => {

    const dispatch = useDispatch();

  useEffect(()=>{
    (async ()=>{
      let res = await axiosInstance.get("/auth/me");
      if(res){
        dispatch(addUser(res.data.user))
      }
    })();
  },[dispatch])
  return (
    <>
    <AppRouter/>
    </>
  ) 
}

export default App;