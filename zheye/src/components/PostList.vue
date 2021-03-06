<template>
  <div class="post-list">
    <div v-for="post in postList" :key="post._id" class="card mb-3">
      <div class="row g-0">
        <div class="col-4 align-middle position-relative">
          <img
            @click="goToPostDetail(post._id)"
            class="post-image position-absolute top-50 start-50 translate-middle"
            :src="post.image.url"
            :alt="post.title"
          />
        </div>

        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title" @click="goToPostDetail(post._id)">
              {{ post.title }}
            </h5>
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
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { PostProps } from "@/store/types";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    posts: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup(props) {
    const postList: ComputedRef<PostProps[]> = computed(() =>
      props.posts.map((p) => {
        if (!p.image) {
          p.image = { url: require("@/assets/default-post-banner.webp") };
        } else if (typeof p.image === "string") {
          p.image = { url: p.image };
        }
        p.image.url = p.image.url + "?x-oss-process=image/resize,h_96";
        return p;
      }),
    );

    const router = useRouter();
    const goToPostDetail = (postId: string | undefined) => {
      if (postId) {
        router.push({ name: "PostDetail", params: { id: postId } });
      }
    };

    return { postList, goToPostDetail };
  },
});
</script>

<style scoped>
.post-image {
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  cursor: pointer;
}
.card-title {
  cursor: pointer;
}
</style>
