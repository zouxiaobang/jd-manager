<template>
  <div>
    <p style="text-align: center;margin-top: 12px; font-weight: bold">员工结算流水表</p>
    <el-table
      title=""
      :data="settleRecords"
      style="width: 100%"
      :row-class-name="setClassName">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions :column="1" v-for="item in props.row.batchSettleResponses" :key="item.id">
            <el-descriptions-item>{{ item.batchMessage }}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column
        label="详情"
        prop="message">
      </el-table-column>
      <el-table-column
        label="操作人"
        prop="operator"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作时间"
        prop="lastModifiedTime"
        width="200">
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="settleRecords && settleRecords.length !== 0 && total > pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "SettleRecordTable",
  props: {
    settleRecords: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    }
  },

  methods: {
    // 设置是否显示展开按钮
    setClassName({row}) {
      return row.isBatchSettle ? '' : 'expand';
    },

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
  }
}
</script>

<style lang="less">
.expand .el-table__expand-column .cell {
  display: none;
}
</style>
