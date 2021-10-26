<template>
  <div>
    <staff-info-component :staff-info="staffInfo" :show-empty="showEmpty"></staff-info-component>
    <el-row>
      <el-col :span="16">
        <settle-record-table :settle-records="settleRecords"
                             :total="totalNum"
                             @onHandleSizeChange="onHandleSizeChange"
                             @onHandleCurrentChange="onHandleCurrentChange">
        </settle-record-table>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>
  </div>
</template>

<script>
import StaffInfoComponent from "@/components/staff/StaffInfoComponent";
import {fetchStaffInfo, getSettleRecordByStaff} from "@/api/staff";
import SettleRecordTable from "@/components/staff/SettleRecordTable";

export default {
  name: "StaffDetail",
  components: {
    SettleRecordTable,
    StaffInfoComponent
  },

  data() {
    return {
      staffInfo: {},
      showEmpty: false,
      settleRecords: [],
      totalNum: 0,
    }
  },

  computed: {
    staffId() {
      return this.$route.params.staffId;
    }
  },

  created() {
    this.fetchStaffInfo();
    this.fetchStaffSettleRecord();
  },

  methods: {
    // 获取员工信息
    fetchStaffInfo() {
      fetchStaffInfo(this.staffId).then(data => {
        this.showEmpty = data === null
        this.staffInfo = data || {}
      })
    },

    // 获取员工的结算流水列表
    fetchStaffSettleRecord() {
      getSettleRecordByStaff(this.staffId).then(page => {
        this.totalNum = page.total;
        this.settleRecords = this.totalNum > 0 ? page.content : [];
      })
    },

    // 分页插件每页个数选择
    onHandleSizeChange() {
      this.fetchStaffInfo();
    },

    // 分页插件页数选择
    onHandleCurrentChange() {
      this.fetchStaffInfo();
    },
  }
}
</script>

<style scoped>

</style>
