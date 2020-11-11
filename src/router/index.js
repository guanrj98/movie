import Vue from "vue";
import VueRouter from "vue-router";

import Vant, { Toast } from "vant";
import "vant/lib/index.css"; //引入css文件

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { checkLogin } from "@/utils/checkLogin"

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
    meta: {
      needLogin: true,
    },
    component: () => import("@/views/MyPage.vue"),
  },
  {
    path: "/changeInfo",
    name: "ChangeInfo",
    meta: {
      needLogin: true,
    },
    component: () => import("@/views/ChangeInfo.vue"),
  },
  {
    path: "/changePwd",
    name: "ChangePwd",
    meta: {
      needLogin: true,
    },
    component: () => import("@/views/ChangePwd.vue"),
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
    path: "/mycollection",
    name: "MyCollection",
    meta: {
      needLogin: true,
    },
    component: () => import("@/views/MyCollection.vue"),
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

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (checkLogin()) {
      next();
    } else {
      Toast({
        message: "未登录？请先登录！",
        icon: "warning"
      })
      window.localStorage.setItem("targetPage", to.name);
      window.localStorage.setItem("targetPageQuery", JSON.stringify(to.query))
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }

})

export default router;
