<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <img src="../assets/duola.jpg" alt="" class="img" />
    </div>
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
import { getLocalPassword, setLocalPassword } from "@/utils/userMessage";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      RenewPassword: "",
    };
  },
  created() {
    this.$emit("send", false);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async onSubmit() {
      //判断密码与老密码以及新密码是否相同
      if (this.oldPassword != getLocalPassword()) {
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
          //修改存储到本地的密码
          setLocalPassword(this.newPassword);
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

<style scoped>
.img {
  width: 14rem;
  height: 8rem;
  margin-left: 5rem;
  margin-top: 10px;
}
</style>
