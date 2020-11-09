<template>
  <div class="reg-content">
    <!-- 头像上传 -->
    <el-upload
      class="avatar-uploader"
      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-camera avatar-uploader-icon"></i>
    </el-upload>
    <van-form @submit="onSubmit">
      <van-field
        v-model="nickname"
        autocomplete="off"
        name="nickName"
        label="昵称"
        placeholder="请填写昵称"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="username"
        autocomplete="off"
        name="userName"
        label="用户名"
        placeholder="请填写用户名"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="password"
        autocomplete="off"
        type="password"
        name="password"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="repwd"
        autocomplete="off"
        type="password"
        name="repwd"
        label="确认密码"
        placeholder="再一次输入密码"
        :rules="[{ required: true }]"
      />
      <div style="margin: 16px">
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
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //图片路径
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    async onSubmit(values) {
      // values = { ...values, avatar: this.uploadImg };
      values = { ...values, avatar: this.imageUrl };

      if (this.password != this.repwd) {
        Notify({
          type: "danger",
          message: "两次输入的密码不一致",
        });
        return;
      }
      console.log(values);
      const regmess = await regApi(values);
      console.log(regmess.code);
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
          message: "该用户已经注册过了",
        });
      }
      console.log(regmess);
      console.log(regmess.avatar);
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
.avatar-uploader {
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 45px;
  color: #cdd4db;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
