import { post, get } from "@/utils/request";

export function regApi(user) {
  return post("/api/v1/auth/reg", user);
}


export function loginApi(user) {
  return post("/api/v1/auth/login", user)
}

export function getUserInfo() {
  return get("/api/v1/users/info")
}