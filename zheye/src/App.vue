<template>
  <GlobalHeader :user="{}" />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";

const currentUser: UserProps = {
  id: 1,
  isLoggedIn: true,
  name: "Xucong",
};

export default defineComponent({
  name: "App",
  components: { GlobalHeader },
  setup() {
    return { user: currentUser };
  },
});
</script>

<style lang="scss"></style>
