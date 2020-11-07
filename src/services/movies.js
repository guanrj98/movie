import { get } from "@/utils/request";

//获取影片详情
export function getMoviesApi(params) {
  return get("/api/v1/movies", { ...params });
}
