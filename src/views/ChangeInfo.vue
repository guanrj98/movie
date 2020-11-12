<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="reg-content">
      <van-form @submit="onSubmit">
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          :preview-full-image="false"
          multiple
          :preview-size="120"
          round="true"
          :max-count="1"
          :upload-icon="avatar | dalImg"
          class="uploadimg"
        />
        <div class="bottom">
          <van-field
            v-model="nickName"
            autocomplete="off"
            name="nickName"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写您的昵称' }]"
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
              确认更改
            </van-button>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { ChangeUserInfoAPI, getUserInfo, getImgUrl } from "@/services/auth";
import { Toast } from "vant";

export default {
  data() {
    return {
      nickName: "",
      gender: "",
      avatar: "",
      fileList: [],
      btnShow: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    async afterRead(files) {
      // 此时可以自行将文件上传至服务器
      console.log("图片信息" + files);
      const data = new FormData();
      data.append("file", files.file);
      const httpImg = await getImgUrl(data);
      console.log(httpImg);
      //截取图片地址
      console.log(httpImg.fileName.split(".tmp")[1]);
      this.avatar = httpImg.fileName.split(".tmp")[1];
    },
    async onSubmit() {
      //发起修改用户信息请求
      await ChangeUserInfoAPI({
        nickName: this.nickName,
        gender: this.gender,
        avatar: this.avatar,
      });
      Toast({
        message: "修改成功",
      });
      setTimeout(() => {
        this.$router.push({
          name: "MyPage",
        });
      }, 2000);
    },
  },
  //页面创建获取用户信息展示
  async created() {
    this.$emit("send", false);
    const res = await getUserInfo();
    this.nickName = res.nickName;
    this.gender = res.gender;
    this.avatar = res.avatar;
  },
};
</script>
<style>
.van-icon__image {
  width: 120px;
  height: 120px;
}
</style>
<style scoped>
.reg-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.van-uploader {
  position: absolute;
  top: 2px;
  left: 90px;
}

.van-form {
  position: relative;
}
.bottom {
  margin-top: 130px;
}
</style>
