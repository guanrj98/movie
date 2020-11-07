<template>
  <div class="login-content">
    <div>
      <img src="../assets/duola.jpg" alt="" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <router-link :to="{ name: 'Reg' }">没有账号，我要注册</router-link>
  </div>
</template>

<script>
import { loginApi } from "@/services/auth";
import { setToken } from "@/utils/token";
import { Notify } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      const res = await loginApi(values);
      // console.log(values);
      if (res.code === 1) {
        // console.log(1);
        setToken(res.token);
        Notify({
          type: "success",
          message: "登录成功!",
        });
      } else {
        Notify({
          type: "warning",
          message: res.info,
        });
      }
      this.username = "";
      this.password = "";
      // console.log(res);
    },
  },
};
</script>

<style>
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
