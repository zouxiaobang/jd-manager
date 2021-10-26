<template>
  <div>
    <el-table
      :data="settleRecords"
      style="width: 100%"
      :row-class-name="setClassName">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions :column="1" v-for="item in props.row.batchSettleResponses">
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
        prop="operator">
      </el-table-column>
      <el-table-column
        label="操作时间"
        prop="lastModifiedTime">
      </el-table-column>
    </el-table>
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
  },

  methods: {
    // 设置是否显示展开按钮
    setClassName({row}) {
      return row.isBatchSettle ? '' : 'expand';
    },
  }
}
</script>

<style lang="less">
.expand .el-table__expand-column .cell {
  display: none;
}
</style>
