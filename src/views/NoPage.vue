<template>
  <div>
    <img src="../assets/404.png" alt="" />
    <h3>哎呀，您要访问的页面走丢了</h3>
    <van-button type="default" icon="arrow-left" class="btn" @click="goback"
      >Go Back</van-button
    >
  </div>
</template>

<script>
// import { Button } from "vant";
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
img {
  width: 70%;
}
p {
  font-size: 20px "幼圆" 600;
}
.van-button__content {
  display: flex;
  flex-direction: row;
}
</style>
