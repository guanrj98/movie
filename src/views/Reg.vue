<template>
  <div class="reg-content">
    <!-- 头像上传 -->
    <!-- <el-upload
      class="avatar-uploader"
      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-camera avatar-uploader-icon"></i>
    </el-upload> -->

    <van-form @submit="onSubmit">
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        :preview-full-image="false"
        multiple
        :preview-size="120"
        :round="true"
        :max-count="1"
        class="uploadimg"
      />
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
        v-model="gender"
        name="gender"
        label="性别"
        autocomplete="off"
        placeholder="请填写性别"
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

      <van-dialog
        v-model="show"
        :show-confirm-button="btnShow"
        :show-cancel-button="btnShow"
      >
        <p class="title">注册成功</p>
        <i class="iconfont iconduigou1"></i>
        <p class="txtTologin">
          <van-count-down :time="time">
            <template #default="timeData">
              <span class="block">{{ timeData.seconds + 1 }}</span>
            </template>
          </van-count-down>
          <span>秒后跳到登录页面...</span>
        </p>
      </van-dialog>
    </van-form>
    <!-- router相当于一个a标签 -->
    <router-link :to="{ name: 'Login' }">已有账号，我要登录</router-link>
  </div>
</template>

<script>
import { Toast } from "vant";
import { regApi } from "@/services/auth";

import { getImgUrl } from "@/services/auth";

import { clearToken } from "@/utils/token";

export default {
  name: "Reg",
  data() {
    return {
      time: 3 * 1000,
      show: false,
      btnShow: false,
      nickname: "",
      username: "",
      gender: "",
      repwd: "",
      password: "",
      fileList: [],
      imageUrl: "",
    };
  },
  created() {
    this.$emit("send", false);
  },
  methods: {
    async afterRead(files) {
      // 此时可以自行将文件上传至服务器
      console.log("图片信息" + files);
      const data = new FormData();
      data.append("file", files.file);
      //调取接口
      const httpImg = await getImgUrl(data);
      //截取图片地址
      console.log(httpImg.fileName.split(".tmp")[1]);
      this.imageUrl = httpImg.fileName.split(".tmp")[1];
      console.log(this.fileList);
    },
    async onSubmit(values) {
      values = { ...values, avatar: this.imageUrl };
      if (this.password != this.repwd) {
        Toast({
          message: "密码不一致",
          icon: "warning",
        });
        return;
      }
      console.log(values);
      console.log("submit");
      try {
        const regmess = await regApi(values);
        console.log(regmess);
        if (regmess.code === 1) {
          //注册成功将出现一个弹出框
          this.show = true;
          //注册完成跳到登录页面
          setTimeout(() => {
            this.show = false;
            this.$router.push({
              name: "Login",
            });
          }, 3000);
        }
      } catch (error) {
        Toast({
          message: "该用户名已被注册,请重新选择用户名",
          icon: "warning",
        });
        clearToken();
      }
    },
  },
};
</script>

<style scoped>
.reg-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.van-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}
.van-uploader {
  display: flex;
  justify-content: center;
  margin: 8px auto;
}
/* .avatar-uploader .el-upload {
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
} */

.van-dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.title {
  text-align: center;
  padding: 10px 0;
  font-size: 1.5em;
  font-family: Microsoft Yahei;
  color: rgb(86, 166, 219);
  letter-spacing: 0.1em;
}
.iconduigou1 {
  margin-left: 35px;
  font-size: 6em;
  color: rgb(41, 161, 57);
}
.txtTologin {
  margin: 1em 0;
  color: #ceab10;
  display: flex;
  justify-content: center;
  letter-spacing: 0.05em;
}
.txtTologin .block {
  color: red;
  font-size: 1.5em;
  padding: 0.1em;
}
</style>
