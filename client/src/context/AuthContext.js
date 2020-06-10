import React, {createContext, useState, useEffect} from 'react'
import {Authenticated} from '../actions/AuthActions'

// Using createContext() you get a Provider and Consumer
export const AuthContext = createContext()

// AuthProvider
export default ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const data = await Authenticated()
        console.log(data)
        setUser(data.user)
        setIsAuthenticated(data.isAuthenticated)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAuth()
  }, [])
  return (
    <div>
      {!isLoaded ? <h1>Loading...</h1> : 
      <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
        { children }
      </AuthContext.Provider>}
    </div>
  )
}