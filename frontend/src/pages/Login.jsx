
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {  useState } from "react"
import axios from 'axios';
import { URL } from "../url"
import { useContext } from 'react';
import { UserContext } from "../context/UserContext"

const LoginPage = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{
    try {
      const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      // console.log(res.data)
      setUser(res.data)
      navigate("/")
    } catch (err) {
     setError(true)
     console.log(err)
    }
  }
    return (
        <>
        <div className="mt-8 w-full bg-black text-white flex items center justify-between  px-6 md:px-[200px] py-4  ">
            
        <h1 className="text-lg md:text-xl  font-extrabold">
          <Link to="/">Blop Application</Link>
        </h1>
        <h3>
              <Link to="/register">Register</Link>
            </h3>
            </div>
      <div className="w-full h-screen flex justify-center items-center bg-gray-900 text-white">{/* Changed h-screen to min-h-screen and added padding */}
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <input onChange={(e)=>setEmail(e.target.value)}
            type="text"
            placeholder="Enter your Email"
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Enter your passwoard"
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <button onClick={handleLogin} className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
            Login
          </button>
          {error && <h3 className="text-red-500 text-sm text-center mt-2">Something went wrong</h3>}
          <div className="flex justify-center items-center space-3">
            <p>New here?</p>
            <p className='text-gray-500 hover:text-black'><Link to="/register">Register</Link></p>

          </div>
        </div>
      </div>
      <Footer/>
      </>
    );
  };
  
  export default LoginPage;
  