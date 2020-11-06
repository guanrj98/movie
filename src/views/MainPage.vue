<template>
  <div class="content">
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerImgs" :key="item.id"
          ><img :src="item.imgUrl" alt="推荐电影"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="newMovie">
      <h4>最新电影</h4>
      <van-grid :border="false" :column-num="6" class="moviesgrid">
        <van-grid-item
          v-for="item in movies"
          :key="item.id"
          :text="nameSplice(item.name)"
          :icon="item.coverImage"
        >
          <!-- <van-image :src="item.coverImage" /> -->
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getMoviesApi } from "@/services/movies";
export default {
  data() {
    return {
      bannerImgs: [
        {
          imgUrl:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2106544408,1221810903&fm=26&gp=0.jpg",
          id: 1,
        },
        {
          imgUrl:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1942655820,938770234&fm=26&gp=0.jpg",
          id: 2,
        },
        {
          imgUrl:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2120146036,1601444365&fm=26&gp=0.jpg",
          id: 3,
        },
        {
          imgUrl:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=358148953,1349188010&fm=26&gp=0.jpg",
          id: 4,
        },
      ],
      movies: [],
    };
  },
  async created() {
    const list = await getMoviesApi({
      per: 12,
    });
    // console.log(list);
    this.movies = list.list;
    console.log(this.movies);
  },
  methods: {
    nameSplice(name) {
      if (name.length >= 7) {
        return name.substr(0, 6) + "...";
      } else {
        return name;
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
.banner {
  height: 25%;
}
.my-swipe {
  height: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  height: 100%;
  width: 100%;
}
.newMovie {
  min-height: 50%;
  width: 100%;
  margin-top: 10%;
  padding-top: 8%;
  overflow: auto;
}
.newMovie::-webkit-scrollbar {
  width: 0 !important;
}
.newMovie h4 {
  position: fixed;
  top: 28%;
  left: 5%;
  z-index: 999;
  text-indent: 1em;
  height: 1.7em;
  width: 30%;
  line-height: 1.7em;
  background-color: rgb(199, 151, 62);
  -webkit-clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
}
.moviesgrid {
  width: 200%;
  height: 100%;
}
.van-grid-item {
  height: 40%;
}
.m-img {
  height: 40%;
}
.van-grid-item img {
  width: 3em;
  height: 4em;
}
.van-grid-item__text {
  font-size: 15px;
}
</style>
