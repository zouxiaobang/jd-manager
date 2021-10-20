<template>
  <div>
    <el-row type="flex" style="height: 60px;background-color: #545c64" align="middle">
      <!--      图标-->
      <el-col :span="2" style="text-align: center">
        <img src="@/assets/logo.png" alt="网站图标" style="width: 50px; height: 50px">
      </el-col>

      <!--      菜单-->
      <el-col :span="18" :offset="1">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <template v-for="item in menuData">
            <el-submenu v-if="item.children.length !== 0" :index="item.key" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group v-for="childItem in item.children" :key="childItem.id">
                <el-menu-item :index="childItem.key" @click="navRouter(childItem.path)">
                  {{childItem.title}}
                </el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-menu-item v-else :index="item.key" @click="navRouter(item.path)" :key="item.id">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>

      <!--      用户信息-->
      <el-col :span="2" :offset="1" style="text-align: center;padding-right: 4px">
        <div>
          <el-dropdown v-if="userName" style="cursor: pointer">
        <span class="el-dropdown-link" style="color: white">
          {{ userName }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
        </span>
            <el-dropdown-menu slot="dropdown" style="text-align: center">
              <el-dropdown-item disabled>
                <div>
                  <el-avatar :src="userAvatar" fit="fill"></el-avatar>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="$emit('signOut')">Sign out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>

    </el-row>
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
    },
    isCollapse: {
      type: Boolean
    },
    menuData: {
      type: Array
    },
    activeIndex: {
      type: String
    }
  },
  methods: {
    navRouter(url) {
      this.$router.push(url);
    }
  }
}
</script>

<style scoped lang="less">
.el-header  {
  background-color: #545c64;
  color: #ffffff;
  line-height: 60px;
}

</style>
