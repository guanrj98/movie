import { get } from "@/utils/request";

export function getMoviesApi(params) {
  return get("/api/v1/movies", { ...params });
}