export function getLocalId() {
  return localStorage.getItem("id");
}
//把用户id存储到本地
export function setLocalId(value) {
  localStorage.setItem("id", value);
}

export function getLocalPassword() {
  return localStorage.getItem("pwd");
}
//把用户pwd存储到本地
export function setLocalPassword(value) {
  localStorage.setItem("pwd", value);
}
