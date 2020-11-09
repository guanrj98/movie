<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="reg-content">
      <van-form @submit="onSubmit">
        <el-upload
          class="avatar-uploader"
          action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="avatar" :src="avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <van-field
          v-model="nickName"
          autocomplete="off"
          name="nickName"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写您的用户名' }]"
        />
        <van-field
          v-model="gender"
          autocomplete="off"
          type="gender"
          name="性别"
          label="性别"
          placeholder="请填写您的性别"
          :rules="[{ required: true, message: '请填写您的性别' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { ChangeUserInfoAPI } from "@/services/auth";
import { getUserInfo } from "@/services/auth";

export default {
  data() {
    return {
      nickName: "",
      gender: "",
      avatar: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      this.avatar = URL.createObjectURL(file.raw);
      console.log(this.avatar);
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
    async onSubmit() {
      console.log(this.nickName);
      console.log(this.gender);
      console.log(this.avatar);
      await ChangeUserInfoAPI({
        nickName: this.nickName,
        gender: this.gender,
        avatar: this.avatar,
      });
      setTimeout(() => {
        this.$router.push({
          name: "MyPage",
        });
      }, 2000);
    },
  },
  async created() {
    const res = await getUserInfo();
    console.log(res);
    this.nickName = res.nickName;
    this.gender = res.gender;
    this.avatar = res.avatar;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>