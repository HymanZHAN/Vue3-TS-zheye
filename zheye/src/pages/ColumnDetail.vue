<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      v-if="column"
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
    >
      <div class="col-3 text-center column-avatar">
        <img class="rounded-circle" :src="column.avatar" :alt="column.title" />
      </div>

      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :posts="posts" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import PostList from "@/components/PostList.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const currentId = +route.params.id;
    const column = store.getters.getColumnById(currentId);
    const posts = store.getters.getPostsByColumnId(currentId);
    return { column, posts };
  },
});
</script>

<style scoped lang="scss">
.column-avatar {
  img {
    max-width: 100px;
  }
}
</style>
