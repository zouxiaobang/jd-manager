<template>
  <div>
    <el-menu :default-openeds="['2']" :collapse="isCollapse">
      <!-- 目录 支持两级目录 -->
      <el-submenu :index="item.key" v-for="item in menuData" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <!-- 子菜单 -->
          <el-menu-item
              v-for="childItem in item.children"
              :key="childItem.id"
              :index="item.key"
              @click="navRouter(childItem.path)">
            {{ childItem.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
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
      this.$router.push("/" + url);
    }
  }
}
</script>

<style scoped>

</style>
