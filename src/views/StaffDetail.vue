<template>
  <div>
    <staff-info-component :staff-info="staffInfo" :show-empty="showEmpty"></staff-info-component>
    <el-row>
      <el-col :span="15">
        <settle-record-table :settle-records="settleRecords"
                             :total="settleRecordTotal"
                             @onHandleSizeChange="onSettleRecordHandleSizeChange(arguments)"
                             @onHandleCurrentChange="onSettleRecordHandleCurrentChange(arguments)">
        </settle-record-table>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-card shadow="hover">
          <p>员工总工资：
            <span class="tip-product-num">{{staffInfo.notPayAmount}}</span>元
          </p>
          <p>待结清工资：
            <span class="tip-product-num">{{staffInfo.totalAmount}}</span>元
          </p>
        </el-card>


        <el-button type="info" plain icon="el-icon-date" size="medium" style="margin-top: 12px" @click="fetchWorkNotes(0, 10)">工作笔记</el-button>
      </el-col>
    </el-row>
    <staff-work-note :work-note-dialog-visible="workNoteDialogVisible"
                     :work-notes="workNotes"
                     :total="workNoteTotal"
                     @onHandleSizeChange="onWorkNotesHandleSizeChange(arguments)"
                     @onHandleCurrentChange="onWorkNotesHandleCurrentChange(arguments)"
                     @onDialogClosed="onDialogClosed"></staff-work-note>
  </div>
</template>

<script>
import StaffInfoComponent from "@/components/staff/StaffInfoComponent";
import {fetchStaffInfo, getSettleRecordByStaff, getWorkNotesByStaffId} from "@/api/staff";
import SettleRecordTable from "@/components/staff/SettleRecordTable";
import {Message} from "element-ui";
import StaffWorkNote from "@/components/staff/StaffWorkNote";

export default {
  name: "StaffDetail",
  components: {
    StaffWorkNote,
    SettleRecordTable,
    StaffInfoComponent
  },

  data() {
    return {
      staffInfo: {},
      showEmpty: false,
      settleRecords: [],
      settleRecordTotal: 0,
      workNoteDialogVisible: false,
      workNotes: [],
      workNoteTotal: 0,
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
    fetchStaffSettleRecord(offset, limit) {
      getSettleRecordByStaff(this.staffId, offset, limit).then(page => {
        this.settleRecordTotal = Number(page.total);
        this.settleRecords = this.settleRecordTotal > 0 ? page.content : [];
      })
    },

    // 分页插件每页个数选择
    onSettleRecordHandleSizeChange(val) {
      this.fetchStaffSettleRecord(val[0], val[1]);
    },

    // 分页插件页数选择
    onSettleRecordHandleCurrentChange(val) {
      this.fetchStaffSettleRecord(val[0], val[1]);
    },

    // 分页查看工作笔记
    fetchWorkNotes(offset, limit) {
      getWorkNotesByStaffId(this.staffId, offset, limit).then(page => {
        this.workNoteTotal = Number(page.total);
        if (this.workNoteTotal === 0) {
          Message.warning('该员工还没有工作笔记');
          return;
        }
        this.workNotes = page.content;
        this.workNoteDialogVisible = true;
      })
    },

    // 分页插件每页个数选择
    onWorkNotesHandleSizeChange(val) {
      this.fetchWorkNotes(val[0], val[1]);
    },

    // 分页插件页数选择
    onWorkNotesHandleCurrentChange(val) {
      this.fetchWorkNotes(val[0], val[1]);
    },

    // 关闭员工笔记对话框
    onDialogClosed() {
      this.workNoteDialogVisible = false;
    }
  }
}
</script>

<style scoped>
.tip-product-num {
  color: #409EFF;
  font-size: 60px;
  font-weight: bold;
}
</style>
