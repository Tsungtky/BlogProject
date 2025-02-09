import { createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';
import { request } from "@/utils";


const userStore = createSlice({
  name: "userStore",
  initialState:{
    user: JSON.parse(localStorage.getItem("user"))
  },
  reducers:{
    setUser(state,action){
      state.user=action.payload // state.user等於是initialState中user一開始的值null, action是由type和payload組成, type是userStore/setUser, payload就是當下乘載的值,例如(dispatch(setUser({id:1, name:john}))),payload就是 {id:1, name:john}
      localStorage.setItem("user",JSON.stringify(action.payload))
    }
  }
})

const {setUser} = userStore.actions

const loginByUser=(email,pwd,dispatch,navigate,setIsLogin)=>{
  const url = "/login?email="+email+"&pwd="+pwd;
  request.get(url)
    .then(
      response => {
        console.log("Request succeeded.", response.data)
        if(response.data.flag === "success"){
          dispatch(setUser(response.data.user))
          setIsLogin(true)
          navigate("/main")
        }else{
          message.error("Email or password is incorrect.");
        }
      },
      error => {
        console.log("Request failed.", error)
      }
    )
}

const registerUser = (user,navigate) =>{
  request.post("/register", //使用axios.post時，user自動序列化為JSON格式
    user,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then(
    response => {
      if(response.data.flag === "success"){
        message.success(response.data.msg);
        navigate("/login")
      }else{
        message.error(response.data.msg);
      }
    },
    error => {
      console.log("Request failed.", error)
    }
  )
}

export {setUser, loginByUser, registerUser}

const userStoreReducer = userStore.reducer // userStoreReducer管理reducer的狀態

export default userStoreReducer
