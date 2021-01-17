<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";

export const emitter = mitt();

type Validator = () => boolean;

export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    let validators: Validator[] = [];
    const registerValidator = (func: Validator | undefined) => {
      if (func) {
        validators.push(func);
      }
    };
    emitter.on("form-item-created", registerValidator);
    onUnmounted(() => {
      emitter.off("form-item-created", registerValidator);
      validators = [];
    });

    const submitForm = () => {
      const allFormFieldsPassed = validators
        .map((v) => v())
        .every((result) => result);
      context.emit("form-submit", allFormFieldsPassed);
    };

    return { submitForm };
  },
});
</script>

<style scoped></style>
