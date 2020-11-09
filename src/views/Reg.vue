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
        name="nickName"
        label="昵称"
        autocomplete="off"
        placeholder="请填写昵称"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        autocomplete="off"
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
        type="password"
        name="password"
        autocomplete="off"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="repwd"
        type="password"
        name="repwd"
        label="确认密码"
        autocomplete="off"
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
        title="注册成功"
        :show-confirm-button="btnShow"
        :show-cancel-button="btnShow"
      >
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
import { setToken } from "@/utils/token";

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
  methods: {
    //文件上传成功触发的事件
    handleAvatarSuccess(res, file) {
      //把本地图片地址改为以http:开头的
      this.imageUrl = URL.createObjectURL(file.raw);
      //图片路径
      console.log("图片地址：" + this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      console.log(file.size / 1024 + "KB");
      const isLt150 = file.size / 1024 < 150;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt150) {
        this.$message.error("上传头像图片大小不能超过 150KB!");
      }
      return isJPG && isLt150;
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

      try {
        const regmess = await regApi(values);
        console.log(regmess);
        if (regmess.code === 1) {
          //注册成功将出现一个弹出框
          this.show = true;
          //注册成功则将token数据存到本地
          setToken(regmess.token);
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
      }
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
.van-dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.van-dialog__header {
  padding: 10px 0;
  font-size: 1.5em;
  font-family: Microsoft Yahei;
  color: rgb(86, 166, 219);
  letter-spacing: 0.1em;
}
.van-dialog__content {
  text-align: center;
}
.iconduigou1 {
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
