<template>
  <div>
    <el-container class="root" direction="vertical">
      <admin-header :user-name="username" :user-avatar="userAvatar" :menu-data="menuData" @signOut="signOut"></admin-header>

      <el-container direction="vertical">
        <admin-page-header></admin-page-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
import {menuData} from '@/router/menus/menu'
import AdminPageHeader from "@/components/AdminPageHeader";

export default {
  name: "Home",
  components: {AdminPageHeader, AdminHeader},
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
      this.$store.dispatch('signOut').then(() => {
        this.$router.push({path: '/login'})
      })
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
