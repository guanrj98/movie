<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repwd"
        type="password"
        name="repwd"
        label="确认密码"
        placeholder="再一次输入密码"
        :rules="[{ required: true, message: '请再次填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <!-- router相当于一个a标签 -->
    <router-link :to="{ name: 'Login' }">已有账号，我要登录</router-link>
  </div>
</template>

<script>
import { Notify } from "vant";
import { regAPI } from "@/services/auth";
import { setToken } from "@/utils/tools";

export default {
  name: "Reg",
  data() {
    return {
      username: "",
      repwd: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      if (this.password != this.repwd) {
        Notify({
          type: "danger",
          message: "两次输入的密码不一致",
        });
        return;
      }
      console.log(values);
      const regmess = await regAPI(values);
      if (regmess.code === "success") {
        //注册成功则将token数据存到本地
        setToken(regmess.token);
        //跳转页面
        this.$router.push({
          name: "Login",
        });
      } else {
        Notify({
          type: "danger",
          message: regmess.message,
        });
      }
      console.log(regmess);
    },
  },
};
</script>

<style></style>
