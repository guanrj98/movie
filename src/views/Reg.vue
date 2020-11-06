<template>
  <div class="reg-content">
    <van-uploader
      v-model="fileList"
      :after-read="callBa"
      multiple
      :max-size="1024 * 500"
      :max-count="1"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="nickname"
        name="nickName"
        label="昵称"
        placeholder="请填写昵称"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="请填写用户名"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="repwd"
        type="password"
        name="repwd"
        label="确认密码"
        placeholder="再一次输入密码"
        :rules="[{ required: true }]"
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
// import { Uploader } from "vant";
import { Notify } from "vant";
import { regApi } from "@/services/auth";
import { setToken } from "@/utils/token";

export default {
  name: "Reg",
  data() {
    return {
      nickname: "",
      username: "",
      repwd: "",
      password: "",
      fileList: [],
      uploadImg: "",
    };
  },
  methods: {
    //文件上传 图片的回调函数
    callBa(imgMessage) {
      console.log(imgMessage);
      this.uploadImg = imgMessage.content;
    },
    async onSubmit(values) {
      values = { ...values, avatar: this.uploadImg };
      if (this.password != this.repwd) {
        Notify({
          type: "danger",
          message: "两次输入的密码不一致",
        });
        return;
      }
      console.log(values);
      const regmess = await regApi(values);
      if (regmess.code === 1) {
        //注册成功则将token数据存到本地
        setToken(regmess.token);
        //跳转页面
        this.$router.push({
          name: "Login",
        });
      } else {
        Notify({
          type: "danger",
          message: regmess.info,
        });
      }
      console.log(regmess);
    },
  },
};
</script>

<style>
.reg-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.van-uploader__upload {
  border-radius: 50%;
}
.van-uploader__preview,
.van-image {
  border-radius: 50%;
}
</style>
