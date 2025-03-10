import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext'
import axios from 'axios'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const  {user, setUser} = React.useContext(UserDataContext)

  const navigate = useNavigate()
  
  const submitHandler = async(e) => {
    e.preventDefault()
    const newUserData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUserData)
    if(response.status === 200){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        User Login
      <img className="w-16 mb-8" src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
      <form onSubmit = {(e) => {submitHandler(e)}}>
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type='email'
          value = {email}
          onChange = {(e) => {
            setEmail(e.target.value)
          }} 
          required 
          placeholder='Your Email Id'/>

        <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
        <input 
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          value = {password}
          onChange = {(e) => {
            setPassword(e.target.value)
          }}
          type='password' 
          required 
          placeholder='Your Password'/>
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Login</button>

        <p className='text-center'>New here? 
          <Link to='/signup' className='text-blue-600'>  Create New Account</Link>
        </p>
      </form>
      </div>
      <div>
        <Link to = '/captain-login' className='bg-[#111] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
