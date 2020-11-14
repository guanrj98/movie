<template>
  <div id="app">
    <topHeader class="topheader" v-show="needHeader"></topHeader>
    <router-view
      class="content"
      @send="getmsg"
      @needtabbar="ntabbar"
    ></router-view>
    <van-tabbar
      v-show="needTabBar"
      v-model="active"
      route
      :fixed="false"
      class="navbar"
      active-color="rgba(63, 0, 255, 0.6)"
    >
      <van-tabbar-item name="main" :to="{ name: 'Main' }" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <!-- <van-tabbar-item
        name="category"
        :to="{ name: 'Category' }"
        :icon="cateBarIco"
        >分类</van-tabbar-item
      > -->
      <van-tabbar-item name="category" :to="{ name: 'Category' }">
        <span>分类</span>
        <template #icon="props">
          <img
            :src="props.active ? categoryicon.active : categoryicon.inactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="list" :to="{ name: 'List' }">
        <span>影库</span>
        <template #icon="props">
          <img :src="props.active ? movieicon.active : movieicon.inactive" />
        </template>
      </van-tabbar-item>
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
      needTabBar: true,
      categoryicon: {
        active: classico1,
        inactive: classico,
      },
      movieicon: {
        active: movies1,
        inactive: movies,
      },
    };
  },
  methods: {
    getmsg(res) {
      this.needHeader = res;
    },
    ntabbar(res) {
      this.needTabBar = res;
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
