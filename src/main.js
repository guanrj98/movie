import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "./router";

import Vant from "vant";
import "vant/lib/index.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { serverUrl } from "@/utils/HeaderUrl";

Vue.filter("dalImg", (avatar) => {
  if (avatar) {
    if (avatar.startsWith("blob:http")) {
      return avatar;
    } else {
      return serverUrl + avatar;
    }
  } else {
    return "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2924932369,1093397730&fm=26&gp=0.jpg";
  }
});

Vue.use(Vant);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
