<template>
  <div>
    <van-tabs v-model="active" @click="onClick">
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
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="item in movies"
          :key="item.id"
          :desc="item.desc"
          :title="item.name"
          :thumb="item.coverImage"
          class="movie"
        />
      </van-list>
    </van-tabs>
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
      movies: [],
      pageData: [],
    };
  },
  async created() {
    this.active = this.$route.query.category_id || "all";
    console.log(this.active);
    this.onLoad(this.$route.query.category_id);
    const listCat = await getCategoriesApi();
    this.categories = listCat;
    listCat.forEach((element) => {
      this.movies["m" + element.id] = [];
    });
  },
  methods: {
    async onLoad(id) {
      console.log(this.active);
      this.pageData.filter((item) => {
        if (item.id == this.active && item.page > item.pages) {
          this.finished = true;
        }
      });
      if (this.finished) {
        return false;
      }
      this.loading = true;
      /* if (this.$route.query.category_id) {
        this.active = this.$route.query.category_id;
      } */
      let c = "";
      if ("all" == this.active) {
        c = "";
      } else {
        c = this.active;
      }
      const res = await getMoviesApi({
        category: c,
        per: 10,
      });
      let hasData = false;
      this.pageData.forEach((item) => {
        if (item.id == c) {
          item.pages = res.pages;
          item.page++;
          hasData = true;
        }
      });
      if (!hasData) {
        this.pageData.push({ id: c, pages: res.pages, page: 2 });
      }
      // console.log(this.movies);
      this.movies = [...this.movies, ...res.list];
      this.loading = false;
      if (!id) {
        id = this.active;
      }
      this.active = id;
      // console.log(this.movies);
    },
    onClick(name, title) {
      this.pageData = [];
      this.movies = [];
      this.onLoad();
      console.log(name, title);
    },
  },
};
</script>

<style scoped>
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
  width: 12em;
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
.van-list img {
  border-radius: 0px;
}
</style>
