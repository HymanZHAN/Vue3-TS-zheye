<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >

    <ul
      v-if="isOpen"
      class="dropdown-menu"
      :style="{ display: 'block' }"
      aria-labelledby="dropdownMenuLink"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useClickOutside } from "@/hooks/useClickOutside";

export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup() {
    const dropdownRef = ref<null | HTMLElement>(null);
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const isClickedOutside = useClickOutside(dropdownRef);
    watch(isClickedOutside, () => {
      if (isClickedOutside.value && isOpen.value) {
        isOpen.value = false;
      }
    });

    return { isOpen, toggleOpen, dropdownRef };
  },
});
</script>

<style scoped></style>
