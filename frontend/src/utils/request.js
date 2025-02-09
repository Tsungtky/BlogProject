import axios from "axios";

const request = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 5000 //5s no response, then , shows error
})

//Request Interceptor
request.interceptors.request.use(
  (config)=>{
    return config;
  },
  (error)=>{
    return Promise.reject(error)
  }
)

//Response Interceptor
request.interceptors.response.use(
  (response)=>{
    return response;
  },
  (error)=>{
    return Promise.reject(error)
  }
)

export { request }
