import Vue from "vue";
import VueRouter from "vue-router";

import Vant from "vant";
import "vant/lib/index.css"; //引入css文件

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/MainPage.vue"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("@/views/Category.vue"),
  },
  {
    path: "/my",
    name: "MyPage",
    component: () => import("@/views/MyPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("@/views/Reg.vue"),
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("@/views/Details.vue"),
  },
  {
    path: "*",
    name: "NoPage",
    component: () => import("@/views/NoPage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
