<template>
  <div class="cat-content">
    <div
      v-for="item in categories"
      :key="item.id"
      class="float-l item"
      @click="jump(item.id)"
    >
      <img :src="item.coverImage" alt="" class="categorycoverimg" />
      <div class="mk"></div>
      <span class="word">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { getCategoriesApi } from "@/services/categories";
import { getMoviesApi } from "@/services/movies";
export default {
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    this.$emit("needtabbar", true);
    this.$emit("send", true);
    const list = await getCategoriesApi();
    this.categories = list;
    // console.log(this.categories);
    this.categories.forEach(async (c) => {
      const res = await getMoviesApi({
        category: c.id,
        per: 1,
      });
      c.coverImage = res.list[0].coverImage;
    });
  },
  methods: {
    haveImg(img) {
      if (!img) {
        return true;
      } else {
        return false;
      }
    },
    jump(id) {
      this.$router.push({
        name: "List",
        query: {
          category_id: id,
        },
      });
    },
  },
};
</script>

<style>
.float-l {
  float: left;
}
.cat-content {
  height: 100%;
  width: 100%;
}
.item {
  float: left;
  width: 30%;
  height: 33%;
  margin-left: 2%;
  margin-top: 10%;
  margin-bottom: 0px;
  position: relative;
  text-align: center;
}
.item img,
.item .mk {
  width: 100%;
  height: 100%;
}
.item .mk {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #292b2c73;
  font-size: 3em;
  writing-mode: vertical-lr;
}
.word {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  font-size: 3em;
  writing-mode: vertical-lr;
  width: fit-content;
  height: fit-content;
  color: aqua;
  font-family: LiSu;
}
</style>
