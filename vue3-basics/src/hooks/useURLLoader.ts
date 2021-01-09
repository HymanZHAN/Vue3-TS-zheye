import axios from "axios";
import { ref } from "vue";

export function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null);
  const loading = ref(true);
  const loaded = ref(false);
  const error = ref(null);

  axios
    .get(url)
    .then(rawData => {
      loading.value = false;
      loaded.value = true;
      result.value = rawData.data;
    })
    .catch(err => {
      error.value = err;
      loading.value = false;
    });

  return {
    result,
    loaded,
    loading,
    error
  };
}
