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
import { PostProps, Resp } from "@/store/types";
import { defineComponent, onMounted, PropType, ref, watch } from "vue";

type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;

export default defineComponent({
  name: "Uploader",
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
    uploadedFile: {
      type: Object,
    },
  },

  emits: ["file-uploaded", "file-uploaded-error"],

  inheritAttrs: false,

  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>();
    const fileStatus = ref<UploadStatus>(
      props.uploadedFile ? "success" : "ready",
    );
    const uploadedData = ref(props.uploadedFile);

    onMounted(() => {
      console.log(props.uploadedFile);
      if (props.uploadedFile) {
        fileStatus.value = "success";
        uploadedData.value = props.uploadedFile;
      }
    });

    watch(
      () => props.uploadedFile,
      (newValue) => {
        console.log(newValue);
        if (newValue) {
          fileStatus.value = "success";
          uploadedData.value = newValue;
        }
      },
    );

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
          const resp: Resp<PostProps> = await api
            .post(props.action, { body: formData })
            .json();
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
