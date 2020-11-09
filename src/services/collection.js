import { get } from "@/utils/request";
//获取用户收藏数据
export function getCollectionApi(params) {
  return get("/api/v1/admin/collection", params);
}
