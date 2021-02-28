<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">
      者也
    </router-link>
    <ul v-if="!user.isLoggedIn" class="mb-0">
      <li class="list-inline-item ">
        <router-link to="/register" class="btn btn-outline-light">
          注册
        </router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light">
          登录
        </router-link>
      </li>
    </ul>
    <ul v-else class="mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好，${user.nickName}`">
          <DropdownItem>
            <router-link :to="{ name: 'CreatePost' }" class="dropdown-item">
              新建文章
            </router-link>
          </DropdownItem>
          <DropdownItem disabled>
            <a href="#" class="dropdown-item">修改资料</a>
          </DropdownItem>
          <DropdownItem>
            <a href="#" class="dropdown-item" @click="logout">退出登录</a>
          </DropdownItem>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "@/components/Dropdown.vue";
import DropdownItem from "@/components/DropdownItem.vue";
import { GlobalDataProps, UserProps } from "@/store/types";
import { useStore } from "vuex";

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
    const store = useStore<GlobalDataProps>();

    const logout = () => {
      store.dispatch("logout");
    };

    return { logout };
  },
});
</script>

<style scoped></style>
