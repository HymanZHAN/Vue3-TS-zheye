<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>This is a modal.</slot>
      </h2>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    "close-modal": null
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };

    return { buttonClick };
  }
});
</script>

<style scoped></style>
