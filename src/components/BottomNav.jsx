import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './BottomNav.css'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../axios/AxiosInstance'
import { logoutUserApi } from '../features/actions/authAction'

const BottomNav = () => {
  const { pathname } = useLocation()
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    try {
      let res = dispatch(logoutUserApi());
      if(res){
        console.log("user logout successfully");
        navigate("/")
        
      }
    } catch (error) {
      console.log("error in user logout",error);
      
    }
  }

  const SignInHandler =()=>{
    navigate("/Authentication")
  }

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span>Home</span>
      </Link>
      {user?
      <button onClick={logoutHandler}>Logout</button>:""
      
    }
    {user?"":
      <button onClick={SignInHandler} className='px-2 py-1 bg-black rounded-full'>SignIn</button>
      
    }

      <Link to="/upload" className={`nav-item ${pathname === '/upload' ? 'active' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
        </svg>
        <span>Upload</span>
      </Link>
    </nav>
  )
}

export default BottomNav
