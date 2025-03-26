import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up"){
        const response = await axios.post('http://localhost:4000/api/user/register', {name, email, password, confirmPassword});
        console.log(response.data);

        if (response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else{
          toast.error(response.data.message);
        }  
      }
      else {
        const response = await axios.post('http://localhost:4000/api/user/login', {email, password});
        console.log(response.data);

        if (response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('User logged in successfully');
        }
        else{
          toast.error(response.data.message);
        }                                          
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token){
      navigate('/dashboard');
    }
  },[token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0259]/5 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="CoinCraft Logo" className="h-20 w-20" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#0b0259]">
            {currentState}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {currentState === "Login" 
              ? "Welcome back! Please sign in to your account"
              : "Create a new account to get started"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md space-y-4">
            {currentState === "Login" ? '': (
              <div>
                <input id="username" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Username" required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b0259] focus:border-[#0b0259] focus:z-10 sm:text-sm transition-all duration-200"  />
              </div>
            )}
            <div>
              <input id="email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email address" required className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b0259] focus:border-[#0b0259] focus:z-10 sm:text-sm transition-all duration-200"  />
            </div>
            <div>
              <input id="password" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b0259] focus:border-[#0b0259] focus:z-10 sm:text-sm transition-all duration-200"  />
            </div>
            {currentState === "Login" ? '' :(
              <div>
                <input id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder="Confirm Password" required className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b0259] focus:border-[#0b0259] focus:z-10 sm:text-sm transition-all duration-200"  />
              </div>
            )}
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0b0259] hover:bg-[#0b0259]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b0259] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >{currentState}</button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {currentState === "Login" 
                ? "Don't have an account? "
                : "Already have an account? "}
              <button type="button" onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")} className="font-medium text-[#0b0259] hover:text-[#0b0259]/80 transition-colors duration-200 hover:underline" >
                {currentState === "Login" ? "Sign Up here" : "Login here"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
