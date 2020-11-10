<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="oldPassword"
        autocomplete="off"
        type="password"
        name="密码"
        label="密码"
        placeholder="请填写您的密码"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="newPassword"
        autocomplete="off"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="请填写您的新密码"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="RenewPassword"
        autocomplete="off"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请重新填写您的新密码"
        :rules="[{ required: true }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Notify } from "vant";
import { ChangeUserPwdAPI } from "@/services/auth";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      RenewPassword: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async onSubmit() {
      console.log(this.oldPassword);
      console.log(this.newPassword);
      console.log(this.RenewPassword);
      if (this.oldPassword != localStorage.getItem("pwd")) {
        Notify({ type: "danger", message: "与老密码不一致" });
      } else {
        if (this.newPassword != this.RenewPassword) {
          Notify({ type: "danger", message: "两次密码不一致" });
        } else {
          const res = await ChangeUserPwdAPI({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          });
          console.log(res);
          Notify({ type: "success", message: "密码修改成功" });
          localStorage.setItem("pwd", this.newPassword);
          setTimeout(() => {
            this.$router.push({
              name: "MyPage",
            });
          }, 1000);
        }
      }
    },
  },
};
</script>

<style>
</style>