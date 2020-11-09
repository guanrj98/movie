import { post } from "@/utils/request";

export function addCollection(params) {
  return post("/api/v1/user/collections", params);
}