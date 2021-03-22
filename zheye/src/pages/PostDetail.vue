<template>
  <div class="post-detail" v-if="post">
    <div class="post-banner row py-lg-3">
      <div class="h-100 col-lg-12 col-md-8 mx-auto">
        <img class="w-100" :src="imageUrl" :alt="post.title" />
      </div>
    </div>
    <h1 class="my-2">{{ post.title }}</h1>
    <UserProfile :dateInfo="post.createdAt" />
    <div class="post-content" v-html="postContent"></div>
    <div v-if="showEditArea" class="btn-group mt-5">
      <router-link
        type="button"
        class="btn btn-success"
        :to="{ name: 'EditPost', query: { id: post._id } }"
      >
        编辑
      </router-link>
      <button type="button" class="btn btn-danger">删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps, UserProps } from "@/store/types";
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import marked from "marked";

import UserProfile from "@/components/UserProfile.vue";

export default defineComponent({
  name: "PostDetail",

  components: {
    UserProfile,
  },

  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const currentId = route.params.id;

    onMounted(async () => {
      await store.dispatch("fetchPost", currentId);
    });

    const post = computed(() => store.state.post);

    const imageUrl = computed(() => {
      if (post.value) {
        if (post.value.image) {
          if (typeof post.value.image === "string") {
            return post.value.image;
          } else {
            return post.value.image.url ?? "";
          }
        }
        return require("@/assets/default-post-banner.webp");
      }
      return "";
    });

    const postContent = computed(() => {
      return marked(post.value?.content ?? "");
    });

    const showEditArea = computed(() => {
      const { _id, isLoggedIn } = store.state.user;
      if (post.value && post.value.author && isLoggedIn) {
        const postAuthor = post.value.author as UserProps;
        return postAuthor._id === _id;
      } else {
        return false;
      }
    });

    return { post, postContent, imageUrl, showEditArea };
  },
});
</script>

<style scoped>
.post-banner {
  height: 200px;
}
.post-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
