<template>
  <div>
    <van-tabs
      v-model="active"
      @click="onClick"
      color=" rgba(63, 0, 255, 0.5)"
      class="topnav"
    >
      <van-tab title="全部" name="all">
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="movie"
            v-for="item in movies"
            :key="item.id"
            :title="item.name"
          >
            <img :src="item.coverImage" :alt="item.name" />
            <div>
              <h5>{{ item.name }}</h5>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </van-list> -->
      </van-tab>
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
    };
  },
  async created() {
    this.active = this.$route.query.category_id || "all";
    // console.log(this.active);
    this.onLoad(this.$route.query.category_id);
    const listCat = await getCategoriesApi();
    this.categories = listCat;
  },
  methods: {
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
.iconfont {
  width: 30px;
  height: 30px;
  display: block;
  background-color: rgba(250, 248, 248, 0.95);
  border-radius: 50%;
  position: absolute;
  top: 125px;
  left: 98px;
  z-index: 999;
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
.topnav {
  margin-top: 14%;
  z-index: 99;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
}
.movielist {
  margin-top: 14%;
}
.movie {
  height: 20%;
  width: 95%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.van-card__thumb {
  width: 120px;
  height: 160px;
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
</style>
