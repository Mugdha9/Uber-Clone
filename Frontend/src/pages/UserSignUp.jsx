import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext'

const UserSignUp = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user, setUser} = React.useContext(UserDataContext)

  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault()
    const newUserData = ({
      fullname:{
        firstname: firstName, 
        lastname: lastName,
      },
      email: email,
      password: password
    })
    console.log(newUserData)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUserData)

    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        User SignUp
      <img className="w-16 mb-8" src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
      <form onSubmit = {(e) => {submitHandler(e)}}>
        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-3 mb-6'>
          <input 
            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            type='text'
            required 
            placeholder='First Name'
            value = {firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }} />
          <input 
            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            type='text'
            required 
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}/>
        </div>
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type='email'
          required 
          placeholder='Your Email Id'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}/>
        <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
        <input 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
          type='password' 
          required 
          placeholder='Your Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}/>
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'>SignUp</button>

        <p className='text-center'>Already a member? 
          <Link to='/login' className= 'text-blue-600'>  Login</Link>
        </p>
      </form>
      </div>
      <div>
        <p className = 'text-[12px] leading-tight'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from uber and it's affiliates to the number provided. 
        </p>
      </div>
    </div>
  )
}

export default UserSignUp
