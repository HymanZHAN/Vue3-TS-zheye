<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      class="file-input d-none"
      @change="onFileInputChange"
    />
  </div>
</template>

<script lang="ts">
import api from "@/services/base";
import { defineComponent, PropType, ref } from "vue";

type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;

export default defineComponent({
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },

  emits: ["file-uploaded", "file-uploaded-error"],

  inheritAttrs: false,

  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>();
    const fileStatus = ref<UploadStatus>("ready");
    const uploadedData = ref();
    const triggerUpload = () => {
      fileInput.value?.click();
    };

    const onFileInputChange = async (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        if (props.beforeUpload) {
          const result = props.beforeUpload(currentTarget.files[0]);
          if (!result) {
            return;
          }
        }

        fileStatus.value = "loading";
        const files = Array.from(currentTarget.files);
        const formData = new FormData();
        formData.append("file", files[0]);

        try {
          const resp = await api.post(props.action, { body: formData }).json();
          fileStatus.value = "success";
          uploadedData.value = resp;
          context.emit("file-uploaded", resp);
        } catch (error) {
          fileStatus.value = "error";
          console.log("errpr:", error);
          context.emit("file-uploaded-error", { error });
        } finally {
          if (fileInput.value) {
            fileInput.value.value = "";
          }
        }
      }
    };

    return {
      triggerUpload,
      onFileInputChange,
      fileInput,
      fileStatus,
      uploadedData,
    };
  },
});
</script>

<style scoped></style>
