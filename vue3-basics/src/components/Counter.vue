<template>
  <div>{{ count }}</div>
  <div>{{ double }}</div>
  <span v-for="number in numbers" :key="number">{{ number }}</span>
  <div>
    <button @click="increase">👍</button>
    <button @click="updateGreeting">Update Title</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  onMounted,
  onRenderTriggered,
  ref,
  watch
} from "vue";

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
}

export default defineComponent({
  name: "Counter",
  setup() {
    onMounted(() => {
      console.log("mounted");
    });

    onRenderTriggered(event => {
      console.log(event);
    });

    const data: DataProps = reactive({
      count: 0,
      double: computed(() => {
        return data.count * 2;
      }),
      increase: () => {
        data.count++;
        data.numbers.push(4);
      },
      numbers: [1, 2, 3]
    });
    const refData = toRefs(data);

    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello";
    };
    watch([greetings, () => data.count], () => {
      document.title = greetings.value + data.count;
    });

    return {
      ...refData,
      updateGreeting
    };
  }
});
</script>

<style scoped></style>
