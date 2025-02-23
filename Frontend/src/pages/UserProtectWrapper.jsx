import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext'

const UserProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = React.useContext(UserDataContext)
    
    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    }, [token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response) => {
      if(response.status === 200){
          const data = response.data
          setUser(data.user)
          setIsLoading(false)
      }
  }).catch((error) => {
      setIsLoading(false)
      localStorage.removeItem('token')
      navigate('/login')
  })
    
  if(isLoading)
    return <div>Loading...</div>

  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectWrapper
