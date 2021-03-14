<template>
  <div class="user-profile row">
    <div class="col-2 text-center">
      <img :src="currentUser.avatar && currentUser.avatar.url" alt="" />
    </div>
    <div class="col-6 align-self-center">
      <h4>
        {{ currentUser.nickName }}
      </h4>
      <span class="text-muted">{{ currentUser.description }}</span>
    </div>
    <div class="col-4 align-self-end text-end">创建于：{{ dateInfo }}</div>
  </div>
</template>

<script lang="ts">
import { UserProps } from "@/store/types";
import { computed, ComputedRef, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    dateInfo: {
      type: String,
      default: "",
    },
  },
  setup() {
    const store = useStore();

    const currentUser: ComputedRef<UserProps> = computed(() => {
      const user: UserProps = store.state.user;
      if (!user.avatar) {
        user.avatar = { url: require("@/assets/avatar.jpg") };
      }
      user.avatar.url = user.avatar.url + "?x-oss-process=image/resize,h_80";
      return user;
    });

    return { currentUser };
  },
});
</script>

<style scoped>
.user-profile {
  padding: 1em 0;
  margin: 2em 0;
  border-top: 1px lightgray solid;
  border-bottom: 1px lightgray solid;
}

.user-profile img {
  border-radius: 50%;
  max-height: 80px;
  padding: 2px;
  border: 1px lightgray solid;
}
</style>
