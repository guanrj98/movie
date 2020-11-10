<template>
  <div class="content">
    <div
      v-for="item in categories"
      :key="item.id"
      class="float-l item"
      @click="jump(item.id)"
    >
      <img src="item.coverImage" alt="" />
      <div class="mk" v-show="haveImg(item.coverImage)"></div>
      <span class="word">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { getCategoriesApi } from "@/services/categories";
export default {
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    const list = await getCategoriesApi();
    this.categories = list;
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
.content {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.item {
  width: 30%;
  height: 30%;
  margin: 2em 1.5%;
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
  background-color: #39a9ed;
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
