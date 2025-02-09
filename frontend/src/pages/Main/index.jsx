import React, { useState } from 'react'
import "./index.scss"
import { Outlet } from 'react-router-dom'

export default function Main() {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Outlet context={{isLogin, setIsLogin}}/>
    </div>
  )
}
