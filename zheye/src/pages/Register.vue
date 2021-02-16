<template>
  <ValidateForm @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="emailInput" class="form-label">邮箱地址</label>
      <ValidateInput
        id="emailInput"
        type="email"
        placeholder="请输入邮箱地址"
        v-model="emailVal"
        :rules="emailRules"
      />
    </div>
    <div class="mb-3">
      <label for="emailInput" class="form-label">昵称</label>
      <ValidateInput
        id="nickNameInput"
        type="text"
        placeholder="请输入昵称"
        v-model="nickNameVal"
        :rules="nickNameRules"
      />
    </div>
    <div class="mb-3">
      <label for="passwordInput" class="form-label">密码</label>
      <ValidateInput
        id="passwordInput"
        type="password"
        placeholder="请输入密码"
        v-model="passwordVal"
        :rules="passwordRules"
      />
    </div>
    <div class="mb-3">
      <label for="passwordInputConfirmation" class="form-label">
        确认密码
      </label>
      <ValidateInput
        id="passwordInputConfirmation"
        type="password"
        placeholder="请再次输入密码"
        v-model="passwordConfirmVal"
        :rules="passwordConfirmRules"
      />
    </div>
    <template #submit>
      <span class="btn btn-danger">Submit</span>
    </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import api from "@/services/base";
import { createMessage } from "@/components/createMessage";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter();

    const emailVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];

    const nickNameVal = ref("");
    const nickNameRules: RulesProp = [
      { type: "required", message: "昵称不能为空" },
    ];

    const passwordVal = ref("");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];

    const passwordConfirmVal = ref("");
    const passwordConfirmRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
      {
        type: "custom",
        validator: () => {
          return passwordVal.value === passwordConfirmVal.value;
        },
        message: "两次输入密码不一致",
      },
    ];

    const onFormSubmit = async (allFieldsValidated: boolean) => {
      if (allFieldsValidated) {
        const payload = {
          email: emailVal.value,
          nickName: nickNameVal.value,
          password: passwordVal.value,
        };
        try {
          await api.post("users/", { json: payload });
          createMessage("注册成功，正在跳转登录页面", "success");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return {
      emailVal,
      emailRules,
      nickNameVal,
      nickNameRules,
      passwordVal,
      passwordRules,
      passwordConfirmVal,
      passwordConfirmRules,
      onFormSubmit,
    };
  },
});
</script>

<style scoped></style>
