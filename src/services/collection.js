import { post } from "@/utils/request";

export function addCollection(params) {
  return post("/api/v1/user/collections", params);
}
import { get } from "@/utils/request";
//获取用户收藏数据
export function getCollectionApi(params) {
  let param = { where: JSON.stringify(params) }
  return get("/api/v1/admin/collection", param);
}
