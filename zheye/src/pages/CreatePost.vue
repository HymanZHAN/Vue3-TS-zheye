<template>
  <div class="create-post-page">
    <h4 class="mb-3">新建文章</h4>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput
          type="text"
          placeholder="请输入文章标题"
          v-model="titleVal"
          :rules="titleRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidateInput
          rows="10"
          placeholder="请输入文章详情"
          v-model="contentVal"
          :tag="'textarea'"
          :rules="contentRules"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary">发表文章</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import { GlobalDataProps } from "@/store/types";
import { PostProps } from "@/store/types";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();

    const titleVal = ref("");
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];

    const contentVal = ref("");
    const contentRules: RulesProp = [
      { type: "required", message: "文章内容不能为空" },
    ];

    const onFormSubmit = (isFormValid: boolean) => {
      if (isFormValid) {
        const { columnId } = store.state.user;
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString(),
          };
          store.commit("createPost", newPost);
          router.push({ name: "ColumnDetail", params: { id: columnId } });
        }
      }
    };

    return { onFormSubmit, titleVal, titleRules, contentVal, contentRules };
  },
});
</script>

<style scoped></style>
