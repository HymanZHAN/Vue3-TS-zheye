<template>
  <div class="create-post-page">
    <h4 class="mb-3">{{ isEditMode ? "编辑文章" : "新建文章" }}</h4>

    <Uploader
      action="upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUpload"
      :uploadedFile="uploadedFile"
    >
      <h2>点击上传头图</h2>

      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传…</h2>
        </div>
      </template>

      <template #uploaded="dataProps">
        <img
          :src="dataProps.uploadedData.data.url"
          :alt="dataProps.uploadedData.data.filename"
        />
      </template>
    </Uploader>

    <h2>{{ titleVal }}</h2>

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
        <button class="btn btn-primary">
          {{ isEditMode ? "更新文章" : "发表文章" }}
        </button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import Uploader from "@/components/Uploader.vue";
import { GlobalDataProps, ImageProps, Resp } from "@/store/types";
import { PostProps } from "@/store/types";
import { beforeUploadCheck } from "@/helper";
import { createMessage } from "@/components/createMessage";

export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const route = useRoute();
    let imageId = "";

    const titleVal = ref("");
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];

    const contentVal = ref("");
    const contentRules: RulesProp = [
      { type: "required", message: "文章内容不能为空" },
    ];

    const isEditMode = !!route.query.id;
    const uploadedFile = ref();

    onMounted(async () => {
      if (isEditMode) {
        const postId = route.query.id;
        const currentPost: PostProps = await store.dispatch(
          "fetchPost",
          postId,
        );
        if (currentPost && currentPost.image) {
          uploadedFile.value = { data: currentPost.image };
        }
        titleVal.value = currentPost.title;
        contentVal.value = currentPost.content || "";
      }
    });

    const handleFileUpload = (rawData: Resp<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id;
      }
    };

    const onFormSubmit = async (isFormValid: boolean) => {
      if (isFormValid) {
        const { column, _id } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id,
          };
          if (imageId) {
            newPost.image = imageId;
          }

          const actionName = isEditMode ? "updatePost" : "createPost";
          const payload = isEditMode
            ? { postId: route.query.id, payload: newPost }
            : newPost;
          const redirectRoute = isEditMode
            ? { name: "PostDetail", params: { id: route.query.id as string } }
            : { name: "ColumnDetail", params: { id: column } };

          console.log(payload);

          await store.dispatch(actionName, payload);
          createMessage(
            `${isEditMode ? "更新" : "发表"}成功，2秒后跳转到文章`,
            "success",
          );
          setTimeout(() => {
            router.push(redirectRoute);
          }, 2000);
        }
      }
    };

    const uploadCheck = (file: File) => {
      const { passed, error } = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png", "image/webp"],
        size: 2,
      });

      if (error === "format") {
        createMessage("上传格式只能是JPG/PNG/WEBP格式", "error");
      }
      if (error === "size") {
        createMessage("上传图片不能超过2MB", "error");
      }

      return passed;
    };

    return {
      onFormSubmit,
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      uploadCheck,
      handleFileUpload,
      uploadedFile,
      isEditMode,
    };
  },
});
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
