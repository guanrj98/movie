<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi } from "@/services/User";
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
      const res = loginApi(values);
      if (res.code == "success") {
        setToken(res.token);
        Notify({
          type: "success",
          message: "登录成功!",
        });
      } else {
        Notify({
          type: "warning",
          message: res.message,
        });
      }
    },
  },
};
</script>

<style></style>
