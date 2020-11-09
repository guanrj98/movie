import { get } from "@/utils/request";

//获取影片列表
export function getMoviesApi(params) {
  return get("/api/v1/movies", { ...params });
}

//获取影片详情
export function getMoviesInfoApi(id) {
  let url = "/api/v1/movies/" + id;
  return get(url);
}
