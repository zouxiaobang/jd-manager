<template>
  <div>
    <el-menu default-active="staffHome" :collapse="isCollapse">
      <!-- 目录 支持两级目录 -->
      <div v-for="item in menuData" :key="item.id">
        <el-submenu v-if="item.children.length !== 0" :index="item.key">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
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
        <el-menu-item :index="item.key" v-else @click="navRouter(item.path)">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </div>
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
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
