import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Navbar = () => {
    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)

    const sendVerificationOtp = async ()=> {
      try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

        if(data.success){
          navigate('/email-verify')
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    const logout = async ()=> {
      try {
        axios.defaults.withCredentials = true

        const { data } = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')
      } catch (error) {
         toast.error(error.message)
      }
    }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-20'>
      <div className="flex items-center">
        <img src={assets.logo} alt="" className='w-28 sm:w-32 filter brightness-0 invert' />
      </div>
      {userData ?
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white relative group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        {userData.name[0].toUpperCase()}

        <div className='absolute hidden group-hover:block top-0 right-0 z-30 text-gray-800 rounded pt-12'>
  <ul className='list-none m-0 p-2 bg-white/95 backdrop-blur-lg text-sm rounded-lg shadow-xl border border-white/20 min-w-[140px]'>
    {!userData.isAccountVerified && 
      <li onClick={sendVerificationOtp} className='py-2 px-3 hover:bg-blue-50 cursor-pointer rounded-md transition-colors duration-200 flex items-center gap-2'>
        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        Verify email
      </li>
    }
    <li onClick={logout} className='py-2 px-3 hover:bg-red-50 cursor-pointer rounded-md transition-colors duration-200 flex items-center gap-2 text-red-600'>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout
    </li>
  </ul>
</div>
      </div>
      :<button onClick={()=>navigate('/login')} className='flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg'>
        <span className="font-medium">Login</span>
        <img src={assets.arrow_icon} alt="" className="filter brightness-0 invert"/>
      </button>
      }
    </div>
  );
};

export default Navbar;
