import { get } from "@/utils/request";

export function getCategoriesApi() {
  return get("/api/v1/movie_categories");
}