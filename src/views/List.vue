<template>
  <div class="w">
    <van-nav-bar
      left-text=""
      left-arrow
      @click-left="goBack"
      @click-right="showSearch"
      class="topbar"
    >
      <template #title>
        <van-search
          v-model="keyWord"
          placeholder="请输入搜索关键词"
          :class="show"
          @input="iptSearch"
          @search="getSearch"
          @clear="clearSearch"
        />
        <van-tag
          type="primary"
          color="#fff"
          text-color="rgba(63, 0, 255, 0.5)"
          v-show="!showsearch"
          size="large"
          >影库</van-tag
        >
        <ul class="searchul" v-show="showSearchList">
          <li v-for="mov in resoult" :key="mov.id" @click="toDetails(mov.id)">
            {{ mov.name }}
          </li>
        </ul>
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs
      v-model="active"
      @click="onClick"
      color=" rgba(63, 0, 255, 0.5)"
      class="topnav"
    >
      <van-tab title="全部" name="all"></van-tab>
      <van-tab
        v-for="cate in categories"
        :key="cate.id"
        :title="cate.name"
        :name="cate.id"
      >
      </van-tab>
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="movielist"
    >
      <div
        style="position:relative"
        v-for="item in pageData.list"
        :key="item.id"
        @click="toDetails(item.id)"
      >
        <van-card
          :desc="item.desc"
          :title="item.name"
          :thumb="item.coverImage"
          class="movie"
        >
        </van-card>
        <i class="iconfont"></i>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getMoviesByKeyword } from "@/utils/GetMoviesBy";
import { getCategoriesApi } from "@/services/categories";
import { getMoviesApi } from "@/services/movies";
export default {
  data() {
    return {
      active: "all",
      categories: [],
      loading: false,
      finished: false,
      pageData: { category: "", list: [], page: "", pages: "" },
      keyWord: "",
      showsearch: false,
      show: "",
      resoult: [],
      showSearchList: false,
      noborder: "",
    };
  },
  async created() {
    this.$emit("needtabbar", true);
    this.$emit("send", false);
    this.active = this.$route.query.category_id || "all";
    // console.log(this.active);
    this.onLoad(this.$route.query.category_id);
    const listCat = await getCategoriesApi();
    this.categories = listCat;
  },
  methods: {
    clearSearch() {
      this.showSearchList = false;
    },
    async iptSearch() {
      if (this.keyWord.trim() != "") {
        this.resoult = await getMoviesByKeyword(this.keyWord);
        if (this.resoult.length > 0) {
          this.showSearchList = true;
        } else {
          this.showSearchList = false;
        }
        // console.log(this.resoult);
      } else {
        this.showSearchList = false;
      }
    },
    getSearch() {
      // console.log(this.keyWord);
      this.$router.push({
        name: "Search",
        query: { kw: this.keyWord },
      });
    },
    showSearch() {
      if (this.showsearch) {
        this.show = "";
        this.showSearchList = false;
        document.querySelector(".van-nav-bar__right").style.pointerEvents =
          "none";
        setTimeout(() => {
          this.showsearch = false;
          document.querySelector(".van-nav-bar__right").style.pointerEvents =
            "unset";
          document.querySelector(".van-search").style.border = "none";
        }, 500);
      } else {
        document.querySelector(".van-search").style.border =
          "1px solid rgb(71, 71, 211)";
        this.showsearch = true;
        this.show = "showSear";
        // this.showSearchList = true;
      }
    },
    goBack() {
      this.$router.push({
        name: "Main",
      });
    },
    async onLoad(id) {
      if (id) {
        this.active = this.$route.query.category_id;
      }
      if (this.pageData.category == this.active) {
        console.log(this.pageData);
      } else {
        this.pageData.category = this.active;
        this.pageData.list = [];
        this.pageData.page = 1;
        this.pageData.pages = 1;
      }
      if (this.pageData.page > this.pageData.pages) {
        this.finished = true;
      } else {
        this.finished = false;
      }

      let cat = "";
      if (this.pageData.category == "all") {
        cat = "";
      } else {
        cat = this.pageData.category;
      }

      if (this.finished) {
        return false;
      }
      this.loading = true;

      const res = await getMoviesApi({
        category: cat,
        per: 10,
        page: this.pageData.page,
      });
      this.pageData.page++;
      this.pageData.pages = res.pages;

      this.pageData.list = [...this.pageData.list, ...res.list];
      this.loading = false;
      if (!id) {
        id = this.active;
      }
      this.active = id;
    },
    onClick() {
      // this.pageData = { category: "", list: [], page: "", pages: "" };
      this.onLoad();
      // console.log(name, title);
    },
    toDetails(id) {
      this.$router.push({
        name: "Details",
        query: { movieId: id },
      });
    },
  },
};
</script>

<style scoped>
.noborder {
  border: none;
}
.searchul {
  position: absolute;
  top: 90%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 9999;
  width: 60%;
  background-color: #f7f8fa;
  max-height: 500%;
  overflow: auto;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 1px solid rgb(71, 71, 211);
  border-top: none;
  padding-bottom: 1px;
}
.searchul > li {
  box-sizing: content-box;
  line-height: 2em;
  width: 90%;
  margin: 0px auto;
  border-bottom: 1px solid #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
}
.van-search {
  overflow: hidden;
  height: 0px;
  width: 0px;
  transition: all 0.5s linear;
}
/* .noclick {
  pointer-events: unset;
  pointer-events: none;
} */
.showSear {
  width: 100%;
  height: 90%;
  /* border: 1px solid rgb(71, 71, 211); */
}
.w {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.topbar {
  height: 50px;
  box-shadow: 0 1px 1.6vw -0.6vw rgb(150, 146, 146);
}
.movielist {
  flex: 1;
  overflow: auto;
}
.movie {
  height: 15em;
  width: 95%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.van-card__thumb {
  width: 120px;
  height: 160px;
}
.van-search {
  padding: 0px;
}
.van-card__title {
  margin-top: 1em;
  margin-left: 0.7em;
  font-size: 1.5em;
  width: 7em;
  height: 1em;
  line-height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.van-card__desc {
  text-indent: 1.4em;
  width: 90%;
  font-size: 16px;
  text-align: justify;
  /* height: 6.3em; */
  letter-spacing: 0.1em;
  line-height: 1.3em;
  max-height: 8em;
  margin-left: 0.5em;
  margin-top: 1.5em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  white-space: pre-wrap;
}
.iconfont {
  width: 30px;
  height: 30px;
  display: block;
  background-color: rgba(250, 248, 248, 0.95);
  border-radius: 50%;
  position: absolute;
  top: 125px;
  left: 98px;
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
  margin-left: 11.5px;
  border-width: 9px 0 9px 11px;
  border-style: solid;
  border-color: transparent transparent transparent rgb(63, 54, 54);
}
</style>
