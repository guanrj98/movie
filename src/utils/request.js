import Axios from "axios";
import { Notify } from "vant";
import { serverUrl } from "./HeaderUrl";
import { removeToken, getToken } from "./token";

const instance = Axios.create({
  timeout: 5000, //请求超时
  baseURL: serverUrl, //基础地址
});

// 继续封装一个请求和相应拦截
// 比如有些服务器接口在请求之前需要添加全局统一的配置信息
//  我们需要对网络请求的异常做统一捕获
// Add a request interceptor
//  全局请求拦截，在发起请求之前触发
//    1. 添加全局loading
//    1. 在请求头添加token
instance.interceptors.request.use(
  function(config) {
    config.headers.token = getToken(); //请求头添加token
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

// Add a response interceptor
// 全局相应拦截，网络请求返回之后触发，可以做错误处理
//  1. 清除loading
//  2. 错误异常处理
instance.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(err) {
    console.log(err);
    //请求超时
    if (err.message && err.message.indexOf("timeout") > -1) {
      Notify({
        type: "danger",
        message: "网络不稳定，请刷新重试",
      });
    }
    //token异常
    if (err.response && err.response.status == 401) {
      Notify({
        type: "danger",
        message: "用户信息异常",
      });
      removeToken();
      // window.location.href = "/#/login";
    }
    return Promise.reject(err);
  }
);

/**
 * Get请求
 * @param {*}url
 * @param {*}params
 */
export const get = (url, params) => instance.get(url, { params });

/**
 * Post请求
 * @param {*}url
 * @param {*}params
 */
export const post = (url, params) => instance.post(url, params);

/**
 * Put请求
 * @param {*}url
 * @param {*}params
 */
export const put = (url, params) => instance.put(url, params);

/**
 * Delete请求
 * @param {*}url
 * @param {*}params
 */
export const del = (url, params) => instance.delete(url, params);
