import { post } from "@/utils/request";
import { get } from "@/utils/request";

//加入收藏
export function addCollection(params) {
  return post("/api/v1/user/collections", params);
}

//获取用户收藏数据
export function getCollectionApi() {
  return get("/api/v1/user/collections");
}
