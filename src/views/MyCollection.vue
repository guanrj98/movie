<template>
  <div class="mc">
    <van-nav-bar
      title="收藏列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="contentBottom">
      <div
        class="collectMovies"
        v-for="item in movies"
        :key="item.id"
        :data-id="item.movie.id"
      >
        <van-checkbox v-model="item.checked"> </van-checkbox>
        <i class="iconfont"></i>
        <van-card
          :desc="item.date + '      ' + item.movie.views + '人已收藏'"
          :title="item.movie.name"
          :thumb="item.movie.coverImage"
          :data-id="item.movie.id"
          @click="toDetail(item.movie.id)"
        >
        </van-card>
      </div>
    </div>
    <!-- 全选单选 -->
    <van-submit-bar
      label="已选择"
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
import { getCollectionApi, delCollection } from "@/services/collection";

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
    //进详情页
    toDetail(id) {
      this.$router.push({
        name: "Details",
        query: {
          movieId: id,
        },
      });
    },

    async onSubmit() {
      let arr = [];
      // 遍历收藏页数据 如果为选中状态 存到arr数组中
      this.movies.forEach((item) => {
        if (item.checked) {
          arr.push(item.movie.id);
        }
      });
      // console.log(arr);
      //遍历所有选中状态的影片
      for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        //调取取消收藏接口  将每个选中状态的影片从接口中删除
        await delCollection(arr[i]);

        this.movies.forEach((item, index) => {
          if (item.movie.id == arr[i]) {
            this.movies.splice(index, 1);
          }
        });
      }
      // console.log("点击了取消收藏");
    },
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
        //如果收藏影片的长度大于0 将全选和单选保持一致
        //此处的if else是为了解决收藏的影片全部删除后全选按钮仍处于选中状态
        if (this.movies.length > 0) {
          return (
            this.movies.length ==
            this.movies.filter((item) => item.checked).length
          );
        } else {
          return false;
        }
      },
    },
    sum() {
      return this.movies.filter((item) => item.checked == true).length;
    },
  },
  async created() {
    this.$emit("needtabbar", false);
    // 事件派发
    this.$emit("send", false);
    // 调取接口获取收藏页数据 并构建dom树
    const res = await getCollectionApi();
    // console.log(res);
    //向接口数据中添加收藏时间 checked选中状态
    this.movies = res.map((item) => {
      //将时间戳改为一般时间
      let times = new Date(item.createdAt);
      // let times = new Date(1605100776318);
      //改时间格式2020-11-10 20:22:16
      let day = times.toLocaleDateString().replace(/\//g, "-");
      let time = times.toTimeString().substr(0, 8);
      return {
        ...item,
        date: "收藏日期 " + day + "收藏时间 " + time,
        checked: false,
      };
    });
    // console.log(this.movies);
  },
  mounted() {
    //将价格.00移除
    document
      .querySelector(".van-submit-bar__price--integer")
      .nextSibling.remove();
  },
};
</script>

<style scoped>
.mc {
  overflow: hidden;
}
.wrap .topheader > h1 {
  display: none;
}
.wrap h1[data-v-d9ae3272] {
  display: none;
}
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.van-nav-bar__title .van-ellipsis {
  font-size: 20px;
}
.van-nav-bar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 1.6vw -0.6vw rgb(150, 146, 146);
  font-size: 20px;
}
.contentBottom {
  flex: 1;
  overflow: auto;
}
.collectMovies {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.iconfont {
  width: 30px;
  height: 30px;
  display: block;
  background-color: rgba(250, 248, 248, 0.95);
  border-radius: 50%;
  position: absolute;
  top: 105px;
  left: 101px;
  z-index: 1;
}
.iconfont::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 4px;
  margin-left: 11px;
  border-width: 9px 0 9px 11px;
  border-style: solid;
  border-color: transparent transparent transparent rgb(63, 54, 54);
}
.van-card {
  width: 336px;
  padding: 0;
  margin: 7px 3px;
  border-radius: 12px;
}
.van-card__header {
  background-color: #f5f5f5;
  border-radius: 12px;
}
.van-card__thumb {
  padding: 8px;
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
  width: 145px;
  text-overflow: ellipsis;
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
.van-submit-bar__price {
  padding: 0 3px;
}
.van-submit-bar__bar {
  height: 55px;
  line-height: 55px;
}
.van-submit-bar {
  position: sticky;
  border-top: 1px solid rgba(63, 0, 255, 0.5);
  /* box-shadow: 0 -1px 1.6vw -0.6vw rgb(82, 79, 79); */
}
</style>
