import { post } from "@/utils/request";

//添加收藏
export function addCollection(params) {
  return post("/api/v1/user/collections", params);
}
import { get } from "@/utils/request";

//获取用户收藏数据
export function getCollectionApi() {
  return get("/api/v1/user/collections");
}

//删除收藏，传入电影id
import { del } from "@/utils/request";
export function deleteCollectionApi(id) {
  return del("/api/v1/user/collections/" + id);
}
