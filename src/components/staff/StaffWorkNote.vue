<template>
  <div>
    <el-dialog title="员工工作笔记" :visible.sync="workNoteDialogVisible" :before-close="closeDialog">
      <el-table :data="workNotes" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="productName" label="产品名称" width="150"></el-table-column>
        <el-table-column property="productBatchName" label="产品批次名称" width="200"></el-table-column>
        <el-table-column property="price" label="单价(元)" width="100"></el-table-column>
        <el-table-column property="num" label="完成个数" width="60"></el-table-column>
        <el-table-column property="amount" label="工资(元)" width="100"></el-table-column>
        <el-table-column property="finishDays" label="完成天数" width="60"></el-table-column>
        <el-table-column property="finishTime" label="完成时间" width="200"></el-table-column>
      </el-table>
      <el-pagination
        v-if="workNotes && workNotes.length !== 0 && total > pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StaffWorkNote",
  props: {
    workNoteDialogVisible: {
      type: Boolean,
      default: false
    },
    workNotes: {
      type: Array,
      default: []
    },
    total: 0,
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    }
  },

  methods: {
    // 分页插件每页个数选择
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit('onHandleSizeChange', this.currentPage - 1, this.pageSize)
    },

    // 分页插件页数选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('onHandleCurrentChange', this.currentPage - 1, this.pageSize)
    },

    // 关闭对话框
    closeDialog() {
      this.$emit('onDialogClosed')
    },
  }
}
</script>

<style scoped>

</style>
