<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-input v-model="staffName" placeholder="请输入姓名" @keyup.enter.native="search" clearable @clear="search"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" v-for="item in staffInfos" :key="item.id">
        <div class="staffInfo" @click.stop="selectStaff(item)" @mouseenter="blockFocus(true, $event)" @mouseleave="blockFocus(false, $event)">
          <div class="staffHeader">
            <el-avatar :src="item.avatar" fit="fill" class="staffAvatar"></el-avatar>
          </div>
          <p class="staffName">{{ item.name }}</p>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      v-if="staffInfos && staffInfos.length !== 0 && total > pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[24, 48, 72, 96, 120]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {fetchStaffIntroductions} from "@/api/staff";
import {Message} from "element-ui";

export default {
  name: "StaffHome",
  data() {
    return {
      staffInfos: [],
      currentPage: 1,
      pageSize: 24,
      total: 0,
      staffName: ''
    }
  },
  created() {
    this.fetchStaffInfo()
  },
  methods: {
    fetchStaffInfo() {
      fetchStaffIntroductions(this.staffName, this.currentPage - 1, this.pageSize).then(data => {
        let pageVo = data || {};
        this.total = pageVo.total || 0;
        this.staffInfos = pageVo.content || [];
      }).catch(err => {
        Message.error(err)
      })
    },
    selectStaff(staffInfo) {
      // 进入员工计件的操作页面
      console.log(staffInfo)
      this.$router.push(`/staff/count/` + staffInfo.id)
    },
    blockFocus(focus, e) {
      if (focus) {
        e.currentTarget.className = 'staffInfoFocus';
      } else {
        e.currentTarget.className = 'staffInfo';
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchStaffInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchStaffInfo();
    },
    search() {
      this.fetchStaffInfo();
    }
  }
}
</script>

<style scoped lang="less">
.staffInfo {
  display: flex;
  background-color: white;
  margin: 5px;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 2px 1px 0px #909399;
  overflow-x: auto;
  cursor: pointer;
  .staffName {
    color: #909399;
    font-weight: bold;
    margin-left: 1em;
    font-size: 18px;
    background-color: white;
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
}
.staffInfoFocus {
  display: flex;
  background-color: #909399;
  margin: 5px;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .staffName {
    color: white;
    font-weight: bold;
    margin-left: 1em;
    font-size: 18px;
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
}

.staffHeader {
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  position: relative;
}

.staffAvatar {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

</style>
