<template>
  <div>
    <van-nav-bar
      title="收藏列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="contentBottom">
      <div class="collectMovies" v-for="item in movies" :key="item.id">
        <van-checkbox v-model="item.checked"> </van-checkbox>
        <van-card
          :desc="item.date + '      ' + item.movie.views + '人想看'"
          :title="item.movie.name"
          :thumb="item.movie.coverImage"
        >
        </van-card>
      </div>
    </div>
    <!-- 全选单选 -->
    <van-submit-bar
      label="已选择 "
      currency=""
      :price="sum * 100"
      button-text="取消收藏"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { getCollectionApi } from "@/services/collection";
export default {
  name: "MyCollection",
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {
      console.log("点击了取消收藏");
    },
  },
  async created() {
    const res = await getCollectionApi();
    console.log(res);
    //向接口数据中添加收藏时间
    this.movies = res.map((item) => {
      //将时间戳改为一般时间
      let times = new Date(item.updatedAt);
      //改时间格式2020-11-10 20:22:16
      let day =
        times.toLocaleDateString().replace(/\//g, "-") +
        " " +
        times.toTimeString().substr(0, 0);
      let time = times.toTimeString().substr(0, 8);
      return {
        ...item,
        date: "收藏日期 " + day + "收藏时间 " + time,
        checked: false,
      };
    });
    console.log(this.movies);
  },
  // 计算属性
  computed: {
    checked: {
      set(v) {
        this.movies.forEach((item) => {
          return (item.checked = v);
        });
      },
      get() {
        return (
          this.movies.length ==
          this.movies.filter((item) => item.checked).length
        );
      },
    },
    sum() {
      return this.movies.filter((item) => item.checked == true).length;
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.van-nav-bar__title .van-ellipsis {
  font-size: 20px;
}
.van-nav-bar {
  line-height: 46px;
}
.van-nav-bar {
  box-shadow: 0 1px 1px 0px #eeeeee;
  font-size: 20px;
}
.contentBottom {
  flex: 1;
  overflow: auto;
}
.collectMovies {
  display: flex;
  justify-content: space-around;
}
.van-card {
  width: 314px;
  padding: 0;
  margin: 7px 4px;
  border-radius: 12px;
}
.van-card__header {
  background-color: #f5f5f5;
  border-radius: 12px;
}
.van-card__thumb {
  padding: 13px;
  width: 100px;
  height: 130px;
}
.van-card__title {
  margin-top: 8px;
  font-size: 20px;
  line-height: 32px;
  color: #2e2e2e;
  font-family: SimHei;
  font-weight: 600;
  max-width: 180px;
}
.van-card__desc {
  margin-top: 10px;
  max-width: 154px;
  white-space: pre-wrap;
  max-height: 90px;
  line-height: 30px;
  font-size: 15px;
  font-family: Microsoft JhengHei;
}
</style>
