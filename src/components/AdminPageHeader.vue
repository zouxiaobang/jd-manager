<template>
  <div class="page-header">
    <el-row class="row">
      <el-col :span="2" @click.native="goBack" v-show="showBack">
        <div class="col">
          <i class="el-icon-top icon"></i>
          返回
          <el-divider direction="vertical" class="divider"></el-divider>
        </div>
      </el-col>
      <el-col :span="22" class="title">
        {{title}}
      </el-col>
    </el-row>
    <el-row class="divider-out">
    </el-row>
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
  data() {
    return {
      showBack: true
    }
  },
  watch: {
    '$route' (to) {
      let disshow = to.meta.isFather || false;
      this.showBack = !disshow
    }
  },
  created() {
    let disshow = this.$route.meta.isFather || false;
    this.showBack = !disshow
  },
  methods: {
    goBack() {
      let father = this.$route.meta.father;
      if (father) {
        this.$router.push({name: father})
      }
    }
  }
}
</script>

<style scoped lang="less">
.row {
  padding: 20px;
  .col {
    display: flex;
    width: 100%;
    font-size: 14px;
    align-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    .icon {
      align-self: center;
      margin-right: 6px;
    }
    .divider {
      align-self: end;
      margin-left: auto;
      margin-right: 8px;
    }
  }
}
.title {
  font-size: 16px;
  font-family: Georgia, serif;
}
.divider-out {
  height: 1px;
  background-color: #DCDFE6;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
