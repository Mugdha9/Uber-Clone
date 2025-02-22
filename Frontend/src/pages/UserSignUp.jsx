import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const UserSignUp = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    const newUserData = ({
      fullName:{
        firstName: firstName, 
        lastName: lastName,
      },
      email: email,
      password: password
    })
    setUserData(newUserData)
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
