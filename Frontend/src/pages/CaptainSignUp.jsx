import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { captainDataContext } from '../Context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain} = React.useContext(captainDataContext)
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault()
    const newUserData = ({
      fullname:{
        firstname: firstname, 
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: { 
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    })

    console.log(newUserData)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newUserData)

    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        Captain Signup
      <img className="w-16 mb-8" src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
      <form onSubmit = {(e) => {submitHandler(e)}}>
        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-3 mb-6'>
          <input 
            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            type='text'
            required 
            placeholder='First Name'
            value = {firstname}
            onChange={(e) => {
              setFirstName(e.target.value)
            }} />
          <input 
            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            type='text'
            required 
            placeholder='Last Name'
            value={lastname}
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


      <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

  
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'>SignUp</button>

        <p className='text-center'>Already a member? 
          <Link to='/captain-login' className= 'text-blue-600'>  Login</Link>
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

export default CaptainSignUp
