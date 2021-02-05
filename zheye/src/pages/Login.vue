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
      <span class="btn btn-danger">Submit</span>
    </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store/types";
import { createMessage } from "@/components/createMessage";

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();

    const emailVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];

    const passwordVal = ref("");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];

    const onFormSubmit = async (isFormValid: boolean) => {
      if (isFormValid) {
        const loginPaylod = {
          email: emailVal.value,
          password: passwordVal.value,
        };
        await store.dispatch("loginAndFetchCurrentUser", loginPaylod);
        if (store.state.token) {
          createMessage("登陆成功，2秒后跳转到首页...", "success");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      }
    };

    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style scoped></style>
