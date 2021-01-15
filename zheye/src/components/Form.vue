<template>
  <form>
    <div class="mb-3">
      <label for="emailInput" class="form-label">邮箱地址</label>
      <ValidateInput
        id="emailInput"
        type="email"
        placeholder="请输入邮箱地址"
        v-model="emailVal"
        :rules="emailRules"
      />
      {{ emailVal }}
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <!-- <input type="password" class="form-control" id="exampleInputPassword1" /> -->
      <ValidateInput
        id="passwordInput"
        type="password"
        placeholder="请输入密码"
      />
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";

export default defineComponent({
  components: {
    ValidateInput,
  },
  setup() {
    const emailVal = ref("xzhan");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    });
    return { emailVal, emailRef, emailRules };
  },
});
</script>

<style scoped></style>
