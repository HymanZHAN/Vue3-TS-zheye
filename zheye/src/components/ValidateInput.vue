<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      v-model="inputRef.val"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <textarea
      v-else
      v-model="inputRef.val"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive } from "vue";

import { emitter } from "./ValidateForm.vue";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface RuleProp {
  type: "email" | "required" | "range" | "custom";
  validator?: () => boolean;
  message: string;
}
export type RulesProp = RuleProp[];

export type InputType = "text" | "email" | "password";

export type InputTag = "input" | "textarea";

export default defineComponent({
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: { type: String as PropType<InputTag>, default: "input" },
  },

  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || "",
        set: (val) => {
          context.emit("update:modelValue", val);
        },
      }),
      error: false,
      message: "",
    });

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailRegex.test(inputRef.val);
              break;
            case "custom":
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };

    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });

    return {
      inputRef,
      validateInput,
    };
  },
});
</script>

<style scoped></style>
