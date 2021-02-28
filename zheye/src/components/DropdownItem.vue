<template>
  <li
    class="dropdown-option"
    :class="{ 'is-disabled': disabled }"
    @click.prevent="emitClicked"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { emitter } from "@/components/Dropdown.vue";

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const emitClicked = () => {
      emitter.emit("dropdown-item-clicked");
    };
    return { emitClicked };
  },
});
</script>

<style>
.dropdown-option.is-disabled .dropdown-item {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
