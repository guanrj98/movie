import { getLocalId, getLocalPassword } from "./userMessage"
import { getToken } from "./token"
export function checkLogin() {
  if (getLocalId() && getLocalPassword() && getToken()) {
    // console.log("已登录");
    return true
  } else {
    // console.log("登录信息过期");
    return false;
  }
}