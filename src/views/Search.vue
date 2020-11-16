<template>
  <div class="searchContent">
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="topbar"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经是底线了"
      class="list"
    >
      <van-cell v-for="item in resoult" :key="item.id" @click="jump(item.id)">
        <div class="title">
          <p class="name">
            {{ item.name }}
          </p>
          <span class="cat">{{ item.category.name }}</span>
          <span class="date">{{ item.date }}</span>
        </div>

        <!-- <p class="smallfont">
        </p> -->
        <p class="desc">{{ item.desc }}</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getMoviesByKeyword } from "@/utils/GetMoviesBy";
import { datetimeToDate } from "@/utils/DateFormart";
export default {
  data() {
    return {
      resoult: [],
      keyword: "",
      loading: false,
      finished: true,
    };
  },
  async created() {
    this.$emit("needtabbar", false);
    this.$emit("send", false);
    this.keyword = this.$route.query.kw;
    if (this.keyword) {
      this.resoult = await getMoviesByKeyword(this.keyword);
      // console.log(this.resoult);
      this.resoult.forEach((item) => {
        item.date = datetimeToDate(item.updatedAt).split(" ")[0];
        if (item.desc.length > 30) {
          item.desc = item.desc.substr(0, 30) + "…";
        }
      });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    jump(id) {
      this.$router.push({
        name: "Details",
        query: { movieId: id },
      });
    },
  },
};
</script>

<style scoped>
.searchContent {
  display: flex;
  flex-direction: column;
}
.list {
  flex: 1;
  overflow: auto;
  height: 100%;
  width: 100%;
}
.topbar {
  line-height: 48px;
  border-bottom: 2px solid rgb(253, 138, 118);
}
.name {
  display: inline-block;
  width: 50%;
  font-size: 22px;
  font-weight: 600;
  font-family: STXinwei;
  color: rgb(92, 92, 89);
  text-indent: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.desc {
  width: 90%;
  margin: 5px auto;
  line-height: 22px;
  font-size: 15px;
  text-indent: 2em;
  height: 40px;
  overflow: hidden;
  color: rgb(96, 98, 99);
}
.smallfont {
  margin-left: 30px;
  height: 12px;
  line-height: 12px;
}
.cat {
  font-size: 12px;
  font-weight: 400;
  font-family: Microsoft Yahei;
  color: rgb(169, 170, 170);
}
.date {
  margin-left: 15px;
  font-size: 12px;
  font-weight: 400;
  font-family: Microsoft Yahei;
  color: rgb(169, 170, 170);
}
.title {
  /* line-height: 32px; */
  display: flex;
  align-items: baseline;
}
.van-cell__value {
  border-bottom: 1px solid rgb(211, 199, 199);
  padding: 8px 0;
}
</style>
