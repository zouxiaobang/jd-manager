<template>
  <div>
    <el-header>
      <el-dropdown v-if="userName">
        <span class="el-dropdown-link" style="color: white">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="text-align: center">
          <el-dropdown-item disabled>
            <div>
              <el-avatar :src="userAvatar" fit="fill"></el-avatar>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @select="$emit('signOut')">Sign out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "AdminHeader",
  props: {
    userName: {
      type: String
    },
    userAvatar: {
      type: String
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  background-color: #303133;
  color: #ffffff;
  line-height: 60px;
  font-size: 14px;
  text-align: right;
}
</style>
