import { post, get, put } from "@/utils/request";

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

//把本地地址转为网络地址
export function getImgUrl(image) {
  return post("/api/v1/common/upload_file", image);
}

//修改用户密码
export function ChangeUserPwdAPI(user) {
  return post("/api/v1/users/change_pwd", user);
}

//修改用户信息
export function ChangeUserInfoAPI(user) {
  return put("/api/v1/users/info", user);
}
