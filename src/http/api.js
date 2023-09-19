import http from "./http";
//登录
export const getlogin = (params)=>http.post("login",params)
//侧边栏
export const getcebian = ()=>http.get("menus")
//用户数据
export const getusers=(data)=>http.get("users",{params:data})
//添加
export const gettian = (data)=>http.post("users",data)
//删除
export const getshan = (id)=>http.delete("/users/"+id)
//编辑
export const getbian= (params)=>http.put("/users/"+params.id,params)