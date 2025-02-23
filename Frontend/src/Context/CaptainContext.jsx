import React, { useState, createContext } from 'react'

export const captainDataContext = createContext()
const CaptainContext = ({ children }) => {

    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const updateCaptain = (captain) => {
        setCaptain(captain);
    };
    
    const value = {
        captain, 
        setCaptain, 
        isLoading, 
        setIsLoading,
        error,
        setError,
        updateCaptain
    };
  return (
    <captainDataContext.Provider value = {value}>
        { children}
    </captainDataContext.Provider>
  )
}

export default CaptainContext
