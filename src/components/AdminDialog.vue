<template>
  <div v-if="dialogVisible">
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeDialog">
      <slot></slot>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="showCancelBtn" @click="closeDialog">{{ cancelText }}</el-button>
        <el-button v-if="showConfirmBtn" type="primary" @click="confirm">{{ confirmText }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminDialog",
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否展示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 是否展示确认按钮
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    // 确认按钮text
    confirmText: {
      type: String,
      default: '确 定'
    },
    // 是否展示取消按钮
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    // 取消按钮text
    cancelText: {
      type: String,
      default: '取 消'
    },
  },

  methods: {
    // 关闭对话框
    closeDialog() {
      this.$emit('onDialogClosed')
    },

    // 确认按钮
    confirm() {
      this.$emit('onConfirmBtnClick')
    }
  }
}
</script>

<style scoped>

</style>
