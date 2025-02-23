import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { captainDataContext } from '../Context/CaptainContext'
const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { captain, setCaptain } = React.useContext(captainDataContext)
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault()
    const newCaptainData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, newCaptainData)

    if(response.status == 200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    
    setEmail('')
    setPassword('')
  }
  

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        Captain Login
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

        <p className='text-center'>Wanna join the fleet? 
          <Link to='/captain-signup' className= 'text-blue-600'>  Register as a Captain</Link>
        </p>
      </form>
      </div>
      <div>
        <Link to = '/login' className='bg-[#111] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
