import { post, get, del } from "@/utils/request";

//加入收藏
export function addCollection(params) {
  return post("/api/v1/user/collections", params);
}
//删除收藏
export function delCollection(id) {
  return del("/api/v1/user/collections/" + id);
}
//获取用户收藏数据
export function getCollectionApi() {
  return get("/api/v1/user/collections");
}

//删除收藏，传入电影id
export function deleteCollectionApi(id) {
  return del("/api/v1/user/collections/" + id);
}
