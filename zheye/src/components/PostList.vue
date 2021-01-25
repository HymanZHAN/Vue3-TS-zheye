<template>
  <div class="post-list">
    <div v-for="post in postList" :key="post.id" class="card mb-3">
      <div class="row g-0">
        <div class="col-4 align-middle position-relative">
          <img
            class="post-image position-absolute top-50 start-50 translate-middle"
            :src="post.image"
            :alt="post.title"
          />
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">
              {{ post.content }}
            </p>
            <p class="card-text">
              <small class="text-muted">{{ post.createdAt }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PostProps } from "@/store/types";

export default defineComponent({
  props: {
    posts: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup(props) {
    const postList = props.posts.map((p) => {
      if (!p.image) {
        p.image = require("@/assets/default-post.png");
      }
      return p;
    });
    console.log(postList);
    return { postList };
  },
});
</script>

<style scoped>
.post-image {
  max-height: 120px;
  max-width: 100%;
  margin: auto;
}
</style>
