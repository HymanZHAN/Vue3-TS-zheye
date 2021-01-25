<template>
  <div class="home-page">
    <h2>{{ biggerLen }}</h2>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link
              :to="{ name: 'CreatePost' }"
              class="btn btn-primary my-2"
            >
              开始写文章
            </router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"></ColumnList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import ColumnList from "@/components/ColumnList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store/types";

export default defineComponent({
  name: "Home",
  components: { ColumnList },
  setup() {
    const store = useStore<GlobalDataProps>();
    onMounted(() => {
      store.dispatch("fetchColumns");
    });

    const list = computed(() => {
      return store.state.columns;
    });

    const biggerLen = computed(() => store.getters.biggerColumnsLen);
    return { list, biggerLen };
  },
});
</script>
