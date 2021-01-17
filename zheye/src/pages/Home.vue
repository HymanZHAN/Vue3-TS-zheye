<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"></ColumnList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColumnList, { ColumnProps } from "@/components/ColumnList.vue";

const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test column 1",
    description: "this is a test intro description",
    avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
  {
    id: 2,
    title: "test column 2",
    description: "this is another test intro description",
    avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
  {
    id: 3,
    title: "test column 3",
    description: "this is another test intro description",
    avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
  {
    id: 4,
    title: "test column 4",
    description: "this is another test intro description",
    // avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
];

export default defineComponent({
  name: "Home",
  components: { ColumnList },
  setup() {
    return { list: testData };
  },
});
</script>
