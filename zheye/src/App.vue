<template>
  <GlobalHeader :user="user" />
  <div class="container">
    <!-- <ColumnList :list="list" /> -->
    <Form></Form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";
import ColumnList, { ColumnProps } from "@/components/ColumnList.vue";
import Form from "@/components/Form.vue";

const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test column 1",
    description: "this is a test intro description",
    avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
  {
    id: 2,
    title: "test column 2",
    description: "this is another test intro description",
    avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
  {
    id: 3,
    title: "test column 3",
    description: "this is another test intro description",
    avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
  {
    id: 4,
    title: "test column 4",
    description: "this is another test intro description",
    // avatar: "https://avatars3.githubusercontent.com/u/1472352?v=4",
  },
];

const currentUser: UserProps = {
  id: 1,
  isLoggedIn: true,
  name: "Xucong",
};

export default defineComponent({
  name: "App",
  components: { Form, GlobalHeader },
  setup() {
    return { list: testData, user: currentUser };
  },
});
</script>

<style lang="scss"></style>
