import { onMounted, onUnmounted, ref, Ref } from "vue";

export const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickedOutside = ref(false);

  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickedOutside.value = !elementRef.value.contains(
        e.target as HTMLElement,
      );
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });

  return isClickedOutside;
};
