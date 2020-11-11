<template>
  <div class="collectContent">
    <div>
      <van-nav-bar
        title="收藏列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="collectMovies">
      <van-card
        desc="描述信息"
        title="商品标题"
        thumb="http://pic2.iqiyipic.com/image/20200916/11/65/a_100402629_m_601_m3.jpg"
      >
        <template #footer>
          <van-button size="mini" @click="delBtn" type="danger"
            >删除</van-button
          >
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCollection",
  created() {
    this.$emit("send", false);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    delBtn() {
      console.log("点击了删除按钮");
    },
  },
};
</script>

<style>
.collectContent {
  display: flex;
  flex-direction: column;
}
.van-nav-bar {
  box-shadow: 0px 2px 2px #eeeeee;
}
.van-nav-bar__left {
  font-size: 16px;
}
.van-nav-bar__title {
  font-size: 20px;
  font-family: "SimHei";
}
.collectMovies {
  flex: 1;
  overflow: auto;
}
.van-card__thumb {
  width: 120px;
  height: 160px;
}
.van-button--mini {
  width: 66px;
  height: 35px;
  font-size: 16px;
  letter-spacing: 2px;
}
.van-card__thumb img {
  border-radius: 0px;
}
</style>
