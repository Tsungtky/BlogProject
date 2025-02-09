import React, { useState } from 'react'
import "./index.scss"
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/store/modules/UserStore';


export default function Register() {

  const [email,setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const handleRegister= ()=>{
    form
    .validateFields()
    .then(values=>{
      console.log(values)
      registerUser(values,navigate) //傳入對象包含form裡面的屬性 name, email, pwd, confirmedpwd
    })
    .catch(info=>{
      console.log("Validation failed.", info)
      message.error("Validation failed.")
    })
  }


  return (
    <div>
      <div className="registerMainDiv">
        <h1>Sign in</h1>
          <Form
            form = {form} // ask teacher why
            style={{
              maxWidth: 600,
            }}
          >

             <Form.Item
              validateTrigger="onChange"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter your full name',
                },
                {
                  min:2,
                  message: 'Minimum length is 2'
                },
                {
                  max:30,
                  message: 'Maximun length is 30'
                }
              ]}
            >
              <Input value={name} placeholder='Please enter your full name' onChange={(e)=>setName(e.target.value)}/>
            </Form.Item>

            <Form.Item
              validateTrigger="onChange"
              name="email"
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
              name="pwd"
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

            <Form.Item
              validateTrigger="onChange"
              name="confirmPwd"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({getFieldValue})=>({
                  validator(_,value){
                     if(!value || getFieldValue("pwd") === value){
                         return Promise.resolve()
                     }
                     return Promise.reject(new Error("Passwords do not match. Please try again."))
                  }
             })
              ]}
            >
              <Input.Password placeholder='Please confirm your password'/>
            </Form.Item>

            <Form.Item label={null}>
              <Button onClick={handleRegister} type="primary" style={{margin: "5px"}} htmlType='submit'>
                Confirm
              </Button>
              <Button type="primary" style={{margin: "5px"}} htmlType='reset'>
                Reset
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  )
}
