<template>
  <div id="app">
    <topHeader class="topheader" v-show="needHeader"></topHeader>
    <router-view class="content" @send="getmsg"></router-view>
    <van-tabbar
      v-model="active"
      route
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
        icon="description"
        >分类</van-tabbar-item
      >
      <van-tabbar-item name="list" :to="{ name: 'List' }" icon="shopping-cart-o"
        >影库</van-tabbar-item
      >
      <van-tabbar-item name="mypage" :to="{ name: 'MyPage' }" icon="user-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import topHeader from "./views/Header";
export default {
  name: "App",
  components: {
    topHeader,
  },
  data() {
    return {
      active: "main",
      needHeader: true,
    };
  },
  methods: {
    getmsg(res) {
      this.needHeader = res;
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
  box-shadow: 0px 2px 2px #eeeeee;
  margin-bottom: 5px;
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
