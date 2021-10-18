<template>
  <div class="page-header">
    <el-page-header style="margin-left: 20px" @back="goBack" :content="title"></el-page-header>
  </div>
</template>

<script>
export default {
  name: "AdminPageHeader",
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    goBack() {
      let isFather = this.$route.meta.isFather
      if (!isFather) {
        let father = this.$route.meta.father;
        this.$router.push({name: father})
      }
    }
  }
}
</script>

<style scoped lang="less">
.page-header {
  padding-top: 20px;
}
</style>
