<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Suspense>
      <template #default>
        <!-- <async-show /> -->
        <dog-show />
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
    <p>{{ error }}</p>
    <!-- <h2>X: {{ x }}, Y:{{ y }}</h2>
    <counter /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onErrorCaptured, ref } from "vue";
// import Counter from "@/components/Counter.vue";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useURLLoader } from "@/hooks/useURLLoader";
// import AsyncShow from "@/components/AsyncShow.vue";
import DogShow from "@/components/DogShow.vue";

interface DogResult {
  message: string;
  status: string;
}

interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default defineComponent({
  name: "Home",
  components: {
    // Counter,
    // AsyncShow,
    DogShow
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
      return true;
    });

    const { x, y } = useMousePosition();
    const { result, loaded, loading } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );

    watch(result, () => {
      if (result.value) {
        console.log(result.value[0].url);
      }
    });

    watch(props, () => {
      console.log(props.msg);
    });

    return {
      x,
      y,
      result,
      loaded,
      loading,
      error
    };
  }
});
</script>
