<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="login-content">
      <div>
        <img src="../assets/duola.jpg" alt="" />
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          autocomplete="off"
          name="userName"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="password"
          autocomplete="off"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <router-link :to="{ name: 'Reg' }">没有账号，我要注册</router-link>
    </div>
  </div>
</template>

<script>
import { loginApi } from "@/services/auth";
import { getUserInfo } from "@/services/auth";
import { setToken } from "@/utils/token";
import { setLocalId, setLocalPassword } from "@/utils/userMessage";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    this.$emit("send", false);
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Main",
      });
    },
    async onSubmit(values) {
      //调接口
      const res = await loginApi(values);
      // console.log(values);
      console.log(values);
      console.log(res);
      //登录成功
      if (res.code === 1) {
        setToken(res.token);
        Toast({
          message: res.info,
          icon: "checked",
        });

        const resUser = await getUserInfo();
        setLocalId(resUser.id);
        setLocalPassword(this.password);

        // login成功跳转
        let target = localStorage.getItem("targetPage");
        let targetQuery = localStorage.getItem("targetPageQuery");
        targetQuery = JSON.parse(targetQuery);
        if (target) {
          // console.log(target, targetQuery);
          this.$router.push({
            name: target,
            query: targetQuery,
          });
        } else {
          this.$router.push({
            name: "Main",
          });
        }
        localStorage.removeItem("targetPage");
        localStorage.removeItem("targetPageQuery");
      }
      //登录失败
      else {
        Toast({
          message: res.info,
          icon: "warning",
        });
        this.password = "";
      }
    },
  },
};
</script>

<style>
.van-nav-bar {
  line-height: 46px;
  box-shadow: 0 1px 2px 1px #eeeeee;
  font-size: 20px;
}
.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  box-sizing: border-box;
  padding: 30px;
  padding-top: 70px;
}
.login-content img {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
}
.van-cell {
  border-bottom: 1px solid rgb(219, 211, 211);
}
.van-field__label {
  width: 4rem;
}
</style>
