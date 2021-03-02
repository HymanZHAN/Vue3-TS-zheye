<template>
  <div class="home-page">
    <h2>{{ biggerLen }}</h2>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link
              :to="{ name: 'CreatePost' }"
              class="btn btn-primary my-2"
            >
              开始写文章
            </router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"></ColumnList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

import { GlobalDataProps, ImageProps, Resp } from "@/store/types";
import { createMessage } from "@/components/createMessage";
import ColumnList from "@/components/ColumnList.vue";

export default defineComponent({
  name: "Home",
  components: { ColumnList },
  setup() {
    const store = useStore<GlobalDataProps>();
    onMounted(() => {
      store.dispatch("fetchColumns");
    });

    const list = computed(() => {
      return store.state.columns;
    });

    const checkBeforeUpload = (file: File) => {
      const isJpg = file.type === "image/jpeg";
      if (!isJpg) {
        createMessage("上传图片只能是jpg格式", "error");
      }
      return isJpg;
    };

    const onFileUploaded = (rawData: Resp<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id}`, "success");
    };

    const onFileUploadError = () => {
      createMessage("上传图片失败", "error");
    };

    const biggerLen = computed(() => store.getters.biggerColumnsLen);
    return {
      list,
      biggerLen,
      checkBeforeUpload,
      onFileUploaded,
      onFileUploadError,
    };
  },
});
</script>
