export function setToken(val) {
  localStorage.setItem("token", val);
}

export function getToken() {
  return localStorage.getItem("token");
}
export function removeToken() {
  localStorage.removeItem("token");
}

export function clearToken() {
  localStorage.clear();
}

export function getLocalId() {
  return localStorage.getItem("id");
}

export function setLocalId(value) {
  localStorage.setItem("id", value);
}

