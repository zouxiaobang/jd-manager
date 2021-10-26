<template>
  <div>
    <staff-info-component :staff-info="staffInfo" :show-empty="showEmpty"></staff-info-component>
    <el-row>
      <el-col :span="16">
        <settle-record-table :settle-records="settleRecords"></settle-record-table>
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
      getSettleRecordByStaff(this.staffId).then(data => {
        this.settleRecords = data || [];
      })
    }
  }
}
</script>

<style scoped>

</style>
