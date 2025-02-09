import React, { useEffect, useState } from 'react'
import "./index.scss"
import { message } from 'antd';
import { request } from "@/utils";
import MyChart from '@/components/MyChart'

export default function Home() {

  const [loginCount, setLoginCount] = useState([])
  const [loginDate, setLoginDate] = useState([])

  useEffect(()=>{
    getLoginCount()
  },[])

  const getLoginCount=()=>{
    const url = "/getLoginCount";
    request.get(url)
      .then(
        response => {
          console.log("Request succeeded.", response.data)
          if(response.data.flag === "success"){
            const results = response.data.results
            const loginCountTemp = []
            const loginDateTemp = []
            results.forEach((result)=>{
              loginCountTemp.push(result[0])
              loginDateTemp.push(result[1])
            })

            console.log("loginCountTemp", loginCountTemp)
            console.log("loginDateTemp", loginDateTemp)
            setLoginCount(loginCountTemp)
            setLoginDate(loginDateTemp)

          }else{
            message.error("Error.");
          }
        },
        error => {
          console.log("Request failed.", error)
        }
      )
  }

  return (
    <div>
      <MyChart currentCount={loginCount} currentDate={loginDate} title={"Login Statistics"} width={"100%"} height={"360px"}/>
    </div>

  )
}
