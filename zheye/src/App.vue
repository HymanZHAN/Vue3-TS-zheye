<template>
  <GlobalHeader :user="user" />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

import GlobalHeader from "@/components/GlobalHeader.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";

export default defineComponent({
  name: "App",
  components: { GlobalHeader },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);

    return { user: currentUser };
  },
});
</script>

<style lang="scss"></style>
