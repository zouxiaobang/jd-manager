<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="item in staffInfos" :key="item.id">
        <div class="staffInfo" @click.stop="selectStaff(item)">
          <div class="staffHeader">
            <el-avatar :src="item.avatar" fit="fill" class="staffAvatar"></el-avatar>
          </div>
          <div class="staffHeader">
            <el-avatar class="staffName">{{ item.name }}</el-avatar>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {fetchStaffIntroductions} from "@/api/staff";
import {Message} from "element-ui";

export default {
  name: "StaffHome",
  data() {
    return {
      staffInfos: []
    }
  },
  mounted() {
    this.fetchStaffInfo()
  },
  methods: {
    fetchStaffInfo() {
      fetchStaffIntroductions().then(data => {
        this.staffInfos = data || [];
      }).catch(err => {
        Message.error(err)
      })
    },
    selectStaff(staffInfo) {
      // todo 进入员工计件的操作页面
      console.log(staffInfo)
      this.$router.push(`/staff/count/` + staffInfo.id)
    }
  }
}
</script>

<style scoped>
.staffInfo {
  display: flex;
  background-color: #e5e9f2;
  margin: 5px;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  cursor: pointer;
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

.staffName {
  width: 50%;
  bottom: 0;
  color: blue;
  font-weight: bold;
  font-size: 18px;
  background-color: #e5e9f2;
  font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>