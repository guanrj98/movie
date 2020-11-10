export function setToken(val) {
  localStorage.setItem("token", val);
}

export function getToken() {
  return localStorage.getItem("token");
}
export function removeToken() {
  localStorage.removeItem("token");
  console.log("removeToken")
}

export function clearToken() {
  localStorage.clear();
}



