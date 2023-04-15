import React,{ useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

type Props = {}

const PrivateRoute = (props: Props) => {
  const tokenString: string | null = localStorage.getItem("authToken");
  const token: any = tokenString !== null ? JSON.parse(tokenString) : null;

  return (
    token ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoute