import React from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    const { isLogin } = useOutletContext()

    if(isLogin){
      return children;
    }else{
      return <Navigate to="/login" replace/>
    }
}
