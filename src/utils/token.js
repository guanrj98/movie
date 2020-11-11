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

// export function setMovieId(val) {
//   localStorage.setItem("movieId", val);
// }
