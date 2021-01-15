<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a href="#" class="navbar-brand">
      者也
    </a>
    <ul v-if="!user.isLoggedIn" class="mb-0">
      <li class="list-inline-item ">
        <a href="#" class="btn btn-outline-light">注册</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light">登陆</a>
      </li>
    </ul>
    <ul v-else class="mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好，${user.name}`">
          <DropdownItem>
            <a href="#" class="dropdown-item">新建文章</a>
          </DropdownItem>
          <DropdownItem disabled>
            <a href="#" class="dropdown-item">修改资料</a>
          </DropdownItem>
          <DropdownItem>
            <a href="#" class="dropdown-item">退出登录</a>
          </DropdownItem>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "@/components/Dropdown.vue";
import DropdownItem from "@/components/DropdownItem.vue";

export interface UserProps {
  id?: number;
  name?: string;
  isLoggedIn: boolean;
}

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
