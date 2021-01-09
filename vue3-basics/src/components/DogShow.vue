<template>
  <div>
    <img :src="result && result.message" alt="dog image" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const rawData = await axios.get("https://dog.ceo/api/breeds/img/random");
    return { result: rawData.data };
  }
});
</script>

<style scoped></style>
