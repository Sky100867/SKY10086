import axios from "axios";

const http = axios.create({
    baseURL:"http://www.tangxiaoyang.vip:8888/api/v2"
})
http.interceptors.request.use(
    (config)=>{
        config.headers.Authorization=localStorage.getItem("token")
        return config
    },
    (err)=>{
        return Promise.reject(err)
    }
)
http.interceptors.request.use(
    (res)=>{
        return res
    },
    (err)=>{
        return Promise.reject(err)
    }
)
export default http