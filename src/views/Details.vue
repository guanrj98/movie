<template>
  <div class="page">
    <!-- :src="movieUrl" -->

    <iframe frameborder="0" id="videoplayer"></iframe>
    <div class="content">
      <div class="content-name">
        <h1 class="name">{{ movie.name }}</h1>
        <span class="cat">{{ movie.category.name }}</span>
      </div>
      <van-tag
        :type="col.style"
        size="large"
        class="cbtn"
        text-color="#fff"
        @click="collection"
      >
        <van-icon name="star" />{{ col.text }}
      </van-tag>
      <div class="desc">
        <h3>剧情简介</h3>
        <p>
          {{ desc.show.msg
          }}<span class="more" @click="descClick">{{ desc.show.text }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMoviesInfoApi } from "@/services/movies";
import {
  addCollection,
  getCollectionApi,
  deleteCollectionApi,
} from "@/services/collection";
import { getLocalId } from "@/utils/userMessage";
import { Toast } from "vant";
export default {
  data() {
    return {
      movieId: "",
      movie: { category: {} },
      movieDesc: {
        hide: { text: "展开", msg: "" },
        show: { text: "收起", msg: "" },
      },
      desc: { ishide: true, show: {} },
      movieUrl: "",
      collec: {
        isColl: { text: "取消", style: "danger " },
        noColl: { text: "收藏", style: "primary" },
      },
      col: { text: "", style: "" },
    };
  },
  async created() {
    if (this.$route.query.movieId) {
      this.movieId = this.$route.query.movieId;
      // console.log(this.movieId);
    }
    await getMoviesInfoApi(this.movieId).then(async (res) => {
      this.movie = res;
      this.movieDesc.hide.msg = this.movie.desc.substr(0, 90) + "…";
      this.movieDesc.show.msg = this.movie.desc;
      this.desc.show = this.movieDesc.hide;
      this.movieUrl = "https://jx.618g.com/?url=" + res.playUrl;
      let id = Number(getLocalId());
      if (id) {
        // console.log(id);
        let res = await getCollectionApi(id);
        console.log(res);
        let hasMovie = false;
        res.map((m) => {
          if (m.movie.id == this.movieId) {
            hasMovie = true;
          }
        });
        if (hasMovie) {
          //已有电影
          this.col = this.collec.isColl;
          console.log("已添加");
        } else {
          //未添加
          this.col = this.collec.noColl;
          console.log("未添加");
        }
        console.log(this.col);
      } else {
        Toast({
          message: "账号异常",
          icon: "warning",
        });
        this.$router.push({
          name: "Login",
        });
      }
    });
  },
  mounted() {
    // const badBlock = document.getElementById("videoplayer").contentWindow;
    /* badBlock.document.write(
      `<script>const badB = document.getElementById("player").contentWindow;`
    ); */
    // console.log(badBlock);
    // badBlock.remove();
  },
  methods: {
    descClick() {
      this.desc.ishide = !this.desc.ishide;
      if (this.desc.ishide) {
        this.desc.show = this.movieDesc.hide;
      } else {
        this.desc.show = this.movieDesc.show;
      }
    },
    async collection() {
      if (this.col.text == "收藏") {
        //收藏
        const res = await addCollection({ movie: this.movieId });
        this.col = this.collec.isColl;
        console.log(res);
      } else if (this.col.text == "取消") {
        const res = await deleteCollectionApi(this.movieId);
        this.col = this.collec.noColl;
        console.log(res);
      }
    },
  },
};
</script>

<style scoped>
.page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: KaiTi;
}
#videoplayer {
  width: 100%;
  height: 30%;
  background-color: black;
}
#sc8tufoxy_footer_br #imgad {
  display: none !important;
}
.content {
  flex: 1;
  width: 100%;
  position: relative;
}
.content-name {
  /* height: 2.5em; */
  display: flex;
  align-items: center;
  width: 80%;
}
.name {
  font-size: 1.5em;
  line-height: 2.5em;
  margin-left: 1em;
  /* min-width: fit-content; */
  /* width: 8em; */
  max-width: 7.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cat {
  color: #a7a7a7;
  margin-bottom: -0.5em;
  /* margin-left: -1em; */
  width: 5em;
  flex: 1;
}
.cbtn {
  position: absolute;
  right: 1em;
  top: 1em;
  height: 2em;
}
.name > span {
  font-size: 0.5em;
  font-weight: 400;
  color: #a7a7a7;
}
.desc {
  width: 80%;
  margin: 0.5em auto;
  background-color: #fff2f2;
  padding: 0.5em 1em;
  border-radius: 0.5em;
}
.desc p {
  text-indent: 2em;
  overflow: hidden;
  color: rgb(49, 44, 44);
  text-align: justify;
  letter-spacing: 0.1em;
  line-height: 1.4em;
  font-size: 1em;
}
.more {
  color: rgb(74, 74, 197);
  cursor: pointer;
}
</style>
