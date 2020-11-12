<template>
  <div id="app">
    <topHeader class="topheader" v-show="needHeader"></topHeader>
    <router-view class="content" @send="getmsg"></router-view>
    <van-tabbar
      v-model="active"
      route
      @change="changeImg()"
      :fixed="false"
      class="navbar"
      active-color="rgba(63, 0, 255, 0.6)"
    >
      <van-tabbar-item name="main" :to="{ name: 'Main' }" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        name="category"
        :to="{ name: 'Category' }"
        :icon="cateBarIco"
        >分类</van-tabbar-item
      >
      <van-tabbar-item name="list" :to="{ name: 'List' }" :icon="listBarIco"
        >影库</van-tabbar-item
      >
      <van-tabbar-item name="mypage" :to="{ name: 'MyPage' }" icon="contact"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import topHeader from "./views/Header";
import movies from "@/assets/movies.png";
import movies1 from "@/assets/movies1.png";
import classico from "@/assets/class.png";
import classico1 from "@/assets/class1.png";
export default {
  name: "App",
  components: {
    topHeader,
  },
  data() {
    return {
      cateBarIco: classico,
      listBarIco: movies,
      active: "main",
      needHeader: true,
    };
  },
  methods: {
    getmsg(res) {
      this.needHeader = res;
    },
    changeImg() {
      console.log(this.active);
      if (this.active == "list") {
        this.listBarIco = movies1;
      } else {
        this.listBarIco = movies;
      }
      if (this.active == "category") {
        this.cateBarIco = classico1;
      } else {
        this.cateBarIco = classico;
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}
.topheader {
  box-shadow: 0px 3px 4px #eeeeee;
  margin-bottom: 8px;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.navbar {
  border-top: 1px solid rgba(63, 0, 255, 0.5);
}
</style>
