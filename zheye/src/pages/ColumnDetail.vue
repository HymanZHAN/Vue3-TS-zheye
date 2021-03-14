<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      v-if="column"
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
    >
      <div class="col-3 text-center column-avatar">
        <img
          class="rounded-circle border w-100"
          :src="column.avatar && column.avatar.url"
          :alt="column.title"
        />
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
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

import PostList from "@/components/PostList.vue";
import { useStore } from "vuex";
import { ColumnProps, PostProps } from "@/store/types";

export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  props: {
    isMyColumn: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();

    let currentId = "";
    if (props.isMyColumn) {
      currentId = store.state.myColumnId;
    } else {
      currentId = route.params.id as string;
    }

    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", currentId);
    });

    const column: ComputedRef<ColumnProps> = computed(() =>
      store.getters.getColumnById(currentId),
    );
    const posts: ComputedRef<PostProps> = computed(() =>
      store.getters.getPostsByColumnId(currentId),
    );
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
