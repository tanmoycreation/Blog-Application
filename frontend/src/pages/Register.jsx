import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from 'axios';
import { URL } from '../url';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gradient-to-r from-gray-800 to-black">
        <h1 className="text-lg md:text-xl font-extrabold text-white">
          <Link to="/">Blog</Link>
        </h1>
        <h3>
          <Link to="/login" className="text-white hover:underline">Login</Link>
        </h3>
      </div>
      <div className="w-full h-screen flex justify-center items-center bg-gray-900">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-[90%] md:w-[30%]">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Create an Account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg outline-none focus:border-blue-500 transition"
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg outline-none focus:border-blue-500 transition mt-4"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg outline-none focus:border-blue-500 transition mt-4"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleRegister}
            className="w-full mt-6 px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
          {error && <h3 className="text-red-500 text-sm text-center mt-2">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3 mt-4">
            <p className="text-gray-400">Already have an account?</p>
            <p className="text-blue-600 hover:underline">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
