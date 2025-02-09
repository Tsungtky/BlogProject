import React, { useState } from 'react'
import "./index.scss"
import { Button, Form, Input } from 'antd';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginByUser } from '@/store/modules/UserStore';


export default function Login() {

  const [email,setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { setIsLogin } = useOutletContext();

  const { user } = useSelector(state=>state.user) // state作為參數, state.user的state是store的整個狀態樹 user是reducer的key
  const dispatch = useDispatch()                  // state.user = userStoreReducer = {user:null} (隨著狀態改變值也改變)
  const navigate = useNavigate()                  // {user} 提取的就是當前狀態user的值

  const handleLogin= ()=>{
    loginByUser(email,pwd,dispatch,navigate,setIsLogin)
  }

  const toRegister= ()=>{
    navigate("/register")
  }


  return (
    <div>
      <div className="loginMainDiv">
        <h1>Log in</h1>
          <Form
            style={{
              maxWidth: 600,
            }}
            /*
              initialValues={{
              username: email,
              password: pwd,
            }}
            */
          >
            <Form.Item
              validateTrigger="onChange"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email',
                },
                {
                  type: "email",
                  message: 'Please enter correct email'
                }
              ]}
            >
              <Input value={email} placeholder='Please enter your email' onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Item>

            <Form.Item
              validateTrigger="onChange"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                  message: 'Password must be 8-20 characters with at least one letter and one number.'
                }
              ]}
            >
              <Input.Password value={pwd} placeholder='Please enter your password' onChange={(e)=>setPwd(e.target.value)}/>
            </Form.Item>

            <Form.Item label={null}>
              <Button onClick={handleLogin} type="primary" style={{margin: "5px"}} htmlType='submit'>
                Log in
              </Button>
              <Button onClick={toRegister} type="primary" style={{margin: "5px"}} htmlType='submit'>
                Register
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  )
}
