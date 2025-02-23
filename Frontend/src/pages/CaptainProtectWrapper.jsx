import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { captainDataContext } from '../Context/CaptainContext'
import axios from 'axios'
const CaptainProtectWrapper = ({ children }) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { captain, setCaptain} = React.useContext(captainDataContext)
  const [ isLoading, setIsLoading ] = useState(true) 

  useEffect(() => {
    if(!token){
        navigate('/captain-login')
    }
  }, [token])

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => {
    if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        setIsLoading(false)
    }
  }).catch((error) => {
    setIsLoading(false)
    localStorage.removeItem('token')
    navigate('/captain-login')
  })

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div>
        {children}
    </div>
  )
}

export default CaptainProtectWrapper
