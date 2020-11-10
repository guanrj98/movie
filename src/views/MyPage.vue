<template>
  <div>
    <div class="top">
      <van-image
        round
        width="3rem"
        height="3rem"
        :src="users.avatar | dalImg"
      />
      <!-- src="http://localhost:1337\uploads\8f0b6692-1b03-4fbc-81db-9ee6c4bd6389.jpg" -->
      <p>欢迎您！{{ this.users.nickName }}</p>
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
        <van-icon name="notes-o" />
        <van-cell title="积分" />
        <van-icon name="arrow" />
      </van-list>
      <van-list border>
        <van-icon name="orders-o" />
        <van-cell title="订单" />
        <van-icon name="arrow" />
      </van-list>
      <van-list border>
        <van-icon name="apps-o" />
        <van-cell title="更多" />
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
import { Toast } from "vant";

import { clearToken } from "@/utils/token";
import { getUserInfo } from "@/services/auth";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    //退出登录
    goBack() {
      this.$router.push({
        name: "Login",
      });
      clearToken();
    },
    //我的收藏
    myFavorite() {
      this.$router.push({
        name: "MyCollection",
        params: {
          id: this.users.id,
        },
        query: {
          id: this.users.id,
        },
      });
    },
    //改变密码
    changePwd() {
      this.$router.push({
        name: "ChangePwd",
      });
    },
    //修改用户信息
    changeInfo() {
      this.$router.push({
        name: "ChangeInfo",
        query: {
          id: this.users.id,
        },
      });
    },
  },
  async created() {
    console.log(localStorage.getItem("pwd"));
    const res = await getUserInfo();
    console.log(res);
    this.users = res;
    console.log(this.users.avatar);
    if (localStorage.getItem("pwd") === "undefined") {
      removeToken();
      this.$router.push({
        name: "Login",
      });
      Toast({
        message: "用户信息异常，请重新登录",
      });
    }
  },
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
  display: flex;
}
.van-img {
  margin-left: 5px;
}
.top p {
  margin-left: 10px;
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
.van-image {
  border: 2px solid red;
  border-radius: 50%;
}
</style>
