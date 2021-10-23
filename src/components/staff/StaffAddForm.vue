<template>
  <div>
    <el-form :model="form">
      <el-form-item>
        <el-autocomplete v-model="form.username" :fetch-suggestions="usernameChanged" :trigger-on-focus="false"
                         placeholder="请输入员工名称" @blur="usernameBlur" @select="usernameSelected"></el-autocomplete>
        <el-button v-if="usernameValid" type="success" icon="el-icon-check" circle size="mini"></el-button>
        <el-popover v-else-if="showUsernameError" placement="top-start" width="200" trigger="hover"
                    :content="usernameErrorMsg">
          <el-button slot="reference" type="danger" icon="el-icon-close" circle size="mini"></el-button>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {blurryName, checkStaffUsername} from "@/api/user";

export default {
  name: "StaffAddForm",
  data() {
    return {
      form: {
        id: undefined,
        username: '',
        phone: '',
      },
      usernameValid: false,
      showUsernameError: false,
      usernameErrorMsg: '',
    }
  },

  methods: {
    // 用户名称输入事件
    usernameChanged(query, cb) {
      if (query && query !== '') {
        blurryName(query).then(data => {
          let userInfos = data || [];
          let transferData = userInfos.map(userInfo => {
            return {
              'value': userInfo.username,
              'id': userInfo.id
            }
          });
          cb(transferData);
        })
      }
    },

    // 用户名称选中事件
    usernameSelected() {
      this.checkUsernameBind();
    },

    // 用户名称失去焦点事件
    usernameBlur() {
      this.checkUsernameBind();
    },

    // 校验用户名称是否已经绑定
    checkUsernameBind() {
      checkStaffUsername(this.form.username).then(data => {
        if (data) {
          this.usernameValid = true;
        } else {
          this.showUsernameError = true;
          this.usernameErrorMsg = '该用户已经被绑定，请重新输入名称';
        }
      })
    }
  },
}
</script>

<style scoped>

</style>
