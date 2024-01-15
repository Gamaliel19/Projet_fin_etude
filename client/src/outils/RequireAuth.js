import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({children}) => {
    const auth = useAuth()

    if(!auth.user){
        <Navigate to={'/login'}/>
    }
  return children
}
