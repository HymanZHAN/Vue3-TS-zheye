<template>
  <ValidateForm @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="emailInput" class="form-label">邮箱地址</label>
      <ValidateInput
        id="emailInput"
        ref="inputRef"
        type="email"
        placeholder="请输入邮箱地址"
        v-model="emailVal"
        :rules="emailRules"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <!-- <input type="password" class="form-control" id="exampleInputPassword1" /> -->
      <ValidateInput
        id="passwordInput"
        type="password"
        placeholder="请输入密码"
        v-model="passwordVal"
        :rules="passwordRules"
      />
    </div>
    <!-- <button type="submit" class="btn btn-primary" :slot="">Submit</button> -->
    <template #submit>
      <span class="btn btn-danger">提交</span>
    </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const inputRef = ref();
    const emailVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];

    const passwordVal = ref("");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];

    const onFormSubmit = (result: boolean) => {
      console.log(result);
    };

    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef,
    };
  },
});
</script>

<style scoped></style>
