<template>
  <div v-if="countInfo !== undefined">
    <el-row>
      <el-col :span="5">
        <el-card shadow="hover" class="card-1">
          <div>
            <p class="text-center">今日完成件数</p>
            <p class="text-center">{{countInfo.todayFinishNum}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card shadow="hover" class="card-2">
          <div>
            <p class="text-center">今日付出工资</p>
            <p class="text-center">{{countInfo.todaySalary}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card shadow="hover" class="card-3">
          <div>
            <p class="text-center">{{ countInfo.month }}月完成件数</p>
            <p class="text-center">{{ countInfo.monthFinishNum }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card shadow="hover" class="card-4">
          <div>
            <p class="text-center">{{ countInfo.month }}月付出工资</p>
            <p class="text-center">{{ countInfo.monthSalary }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {countInfo} from "@/api/statistics";

export default {
  name: "CompanyCounter",
  data() {
    return {
      countInfo: undefined
    }
  },
  created() {
    this.fetchCountInfo();
  },
  methods: {
    fetchCountInfo() {
      countInfo().then(data => {
        this.countInfo = data || undefined;
      })
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  font-family: Consolas, "Liberation Mono", Courier, monospace;
}
.card-1{
  background-color: #67C23A;
}
.card-2{
  background-color: #E6A23C;
}
.card-3{
  background-color: #F56C6C;
}
.card-4{
  background-color: #909399;
}
</style>
