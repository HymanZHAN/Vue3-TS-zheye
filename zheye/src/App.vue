<template>
  <Loader
    v-if="isLoading"
    :text="'拼命加载中......'"
    :background="'rgba(255,255,255,.8)'"
  />
  <GlobalHeader :user="user" />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "@/components/Loader.vue";
import { GlobalDataProps } from "./store/types";
import GlobalHeader from "@/components/GlobalHeader.vue";
import { createMessage } from "@/components/createMessage";

export default defineComponent({
  name: "App",
  components: { GlobalHeader, Loader },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      },
    );

    return { user: currentUser, isLoading, error };
  },
});
</script>

<style lang="scss"></style>
