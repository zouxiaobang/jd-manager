<template>
  <div>
    <el-row v-if="staffInfo && !showEmpty">
      <el-col :span="4">
        <div class="staffInfo">
          <p class="staffHeader">
            <el-avatar :src="staffInfo.avatar" fit="fill" class="staffAvatar"></el-avatar>
          </p>
          <p class="staffName">{{ staffInfo.name }}</p>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-descriptions :column="2" title="员工信息">
          <el-descriptions-item label="手机号码">{{staffInfo.phone}}</el-descriptions-item>
          <el-descriptions-item label="入职时间">{{staffInfo.onboardingTime}}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag size="small" :type="staffInfo.status ? 'info' : 'danger'">
              {{staffInfo.statusDesc}}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="入职时长">{{staffInfo.workTime}} 个月</el-descriptions-item>
          <el-descriptions-item label="角色">
            <span v-for="item in roles" :key="item.role">
              <el-tag size="small" class="tag-item" effect="plain" type="info">{{item.roleCn}}</el-tag>
            </span>
            <el-tag size="small" v-if="roles.length === 0" effect="plain" type="info">员工</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-empty description="查无此员工"></el-empty>
    </el-row>
  </div>
</template>

<script>
import {fetchStaffInfo} from "@/api/staff";

export default {
  name: "StaffInfoComponent",
  computed: {
    staffId() {
      return this.$route.params.staffId;
    }
  },
  data() {
    return {
      showEmpty: false,
      staffInfo: undefined,
      roles: []
    }
  },
  created() {
    this.fetchStaffInfo()
  },
  methods: {
    fetchStaffInfo() {
      fetchStaffInfo(this.staffId).then(data => {
        this.showEmpty = data === null
        this.staffInfo = data || {}
        this.roles = data.roles || []
      })
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

  .staffName {
    color: #909399;
    font-weight: bold;
    margin-left: 1em;
    font-size: 18px;
    background-color: white;
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

.tag-item {
  margin-right: 2px;
}

</style>
