<template>
  <div>
    <div>
      <el-menu
          default-active="staffhome"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item-group
            v-for="item in menuData"
            :key="item.id">
          <el-submenu v-if="item.children.length !== 0" :index="item.key">
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
          <el-menu-item v-else :index="item.key" @click="navRouter(item.path)">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  props: {
    isCollapse: {
      type: Boolean
    },
    menuData: {
      type: Array
    }
  },
  methods: {
    navRouter(url) {
      this.$router.push(url);
    }
  }
}
</script>

<style scoped>

</style>
