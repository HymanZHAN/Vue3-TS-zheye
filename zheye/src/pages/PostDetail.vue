<template>
  <div class="post-detail" v-if="post">
    <Modal
      title="删除文章"
      :visible="isModalVisible"
      @modal-on-close="isModalVisible = false"
      @modal-on-confirm="handleDelete"
    >
      <p>确定要删除该文章吗？</p>
    </Modal>
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
      <button
        type="button"
        class="btn btn-danger"
        @click="isModalVisible = true"
      >
        删除
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps, PostProps, Resp, UserProps } from "@/store/types";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import marked from "marked";

import UserProfile from "@/components/UserProfile.vue";
import Modal from "@/components/Modal.vue";
import { createMessage } from "@/components/createMessage";

export default defineComponent({
  name: "PostDetail",

  components: {
    UserProfile,
    Modal,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const currentId = route.params.id;
    const isModalVisible = ref(false);

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

    const handleDelete = async () => {
      isModalVisible.value = false;

      const postResp: Resp<PostProps> = await store.dispatch(
        "deletePost",
        currentId,
      );

      createMessage("删除成功，2秒后跳转到专栏首页", "success");
      setTimeout(() => {
        router.push({
          name: "ColumnDetail",
          params: { id: postResp.data.column },
        });
      }, 2000);
    };

    return {
      post,
      postContent,
      imageUrl,
      showEditArea,
      isModalVisible,
      handleDelete,
    };
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
