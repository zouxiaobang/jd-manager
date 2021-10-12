<template>
  <div>
    <el-container class="root" direction="vertical">
      <admin-header :user-name="username" :user-avatar="userAvatar" @signOut="signOut"></admin-header>

      <el-container direction="horizontal">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <admin-menu :menu-data="menuData"></admin-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
import AdminMenu from "@/components/AdminMenu";
import {menuData} from '@/router/menus/menu'

export default {
  name: "Home",
  components: {AdminMenu, AdminHeader},
  data() {
    return {
      username: '',
      userAvatar: '',
      menuData: []
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.username = this.$store.getters.username;
      this.userAvatar = this.$store.getters.userAvatar;
      this.menuData = menuData;
    },
    signOut() {
      this.$store.dispatch('signOut')
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped lang="less">
.root {
  border: 1px solid #eee;
}

.el-aside {
  color: #333;
}
</style>
