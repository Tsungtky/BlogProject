import React from 'react'
import "./index.scss"
import { useSelector } from 'react-redux'

export default function Article() {

  const {user} = useSelector(state=>state.user)




  return (
    <div>{user.name} Article</div>
  )
}
