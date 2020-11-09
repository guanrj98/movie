import { post, get } from "@/utils/request";

//注册
export function regApi(user) {
  return post("/api/v1/auth/reg", user);
}

//登录
export function loginApi(user) {
  return post("/api/v1/auth/login", user);
}
//获取用户信息
export function getUserInfo() {
  return get("/api/v1/users/info");
}
