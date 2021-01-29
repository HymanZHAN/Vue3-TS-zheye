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
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "@/components/Loader.vue";
import { GlobalDataProps } from "./store/types";
import GlobalHeader from "@/components/GlobalHeader.vue";

export default defineComponent({
  name: "App",
  components: { GlobalHeader, Loader },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);

    return { user: currentUser, isLoading };
  },
});
</script>

<style lang="scss"></style>
