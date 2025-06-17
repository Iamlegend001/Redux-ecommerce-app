import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthWrapper = (props) => {

  const {users} = useSelector((state)=> state.userReducers)
  return users? props.children: <Navigate to="/login"/>
}

export default AuthWrapper