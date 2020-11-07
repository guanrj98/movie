<template>
  <div>
    <div class="top" v-for="i in users" :key="i.id">
      <van-image round width="3rem" height="3rem" :src="i.gender" />
      <p>欢迎您！{{ i.nickName }}</p>
    </div>
    <div class="main">
      <van-list border>
        <van-icon name="star-o" @click="myFavorite()" />
        <van-cell title="我的收藏" @click="myFavorite()" />
        <van-icon name="arrow" @click="myFavorite()" />
      </van-list>
      <van-list border>
        <van-icon name="eye-o" @click="changePwd()" />
        <van-cell title="修改密码" @click="changePwd()" />
        <van-icon name="arrow" @click="changePwd()" />
      </van-list>
      <van-list border>
        <van-icon name="manager-o" @click="changeInfo()" />
        <van-cell title="修改个人信息" @click="changeInfo()" />
        <van-icon name="arrow" @click="changeInfo()" />
      </van-list>
      <van-list border>
        <van-icon name="down" />
        <van-cell title="我的下载" />
        <van-icon name="arrow" />
      </van-list>
      <van-list border>
        <van-icon name="video-o" />
        <van-cell title="创作中心" />
        <van-icon name="arrow" />
      </van-list>
      <van-list border>
        <van-icon name="setting-o" @click="goBack()" />
        <van-cell title="退出登录" @click="goBack()" />
        <van-icon name="arrow" @click="goBack()" />
      </van-list>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          nickName: "暴龙战士",
          avatar: "男",
          gender:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1478577125,3953054262&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "Login",
      });
    },
    myFavorite() {
      console.log(1);
    },
    changePwd() {
      console.log(2);
    },
    changeInfo() {
      console.log(3);
    },
  },
  created() {},
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.top {
  height: 3rem;
  margin-left: 20px;
  margin-top: 20px;
}
.van-img {
  float: left;
}
.top p {
  float: right;
  margin-right: 160px;
  margin-top: 15px;
}
.main {
  margin-top: 15px;
}
.van-list {
  width: 90%;
  height: 30px;
  display: flex;
  border-bottom: 1px solid #666666;
  margin-top: 2px;
  margin-left: 20px;
}
.van-icon {
  margin-left: 10px;
  margin-top: 6px;
}
.van-cell {
  line-height: 30px;
  padding-left: 10px;
}
.van-icon-arrow {
  margin-right: 15px;
}
</style>
