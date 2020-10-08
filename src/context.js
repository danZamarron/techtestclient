import React, { createContext, useState, useEffect } from "react"
import { getCurrentUserService } from "./services/auth"
export const AppContext = createContext()


export default function Provider({ children }) {
    const [user, setUser] = useState(null)
  
    const setContextUser = user => setUser(user)
    const clearContextUser = () => setUser(null)
  
    useEffect(() => {
      async function fetchUser() {
        const {data: { user }} = await getCurrentUserService()
        setContextUser(user)
      }
      fetchUser()
    }, [])
  
    useEffect(() => {
      
    }, [user])
  
    return (
      <AppContext.Provider
        value={{
          user,
          setContextUser,
          clearContextUser
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }