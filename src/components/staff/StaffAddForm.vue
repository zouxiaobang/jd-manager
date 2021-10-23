<template>
  <div>
    <el-form :model="form">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="affairtypeid">
            <el-autocomplete v-model="form.username" :fetch-suggestions="usernameChanged" :trigger-on-focus="false"
                             placeholder="请输入员工名称" @blur="usernameBlur" @select="usernameSelected">
              <i slot="suffix" class="el-icon-edit" style="color: red"></i>
            </el-autocomplete>
            <el-button v-if="usernameValid" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
            <el-popover v-else-if="showUsernameError" placement="top-start" width="200" trigger="hover"
                        :content="usernameErrorMsg">
              <el-button slot="reference" type="danger" icon="el-icon-close" circle size="mini" plain></el-button>
            </el-popover>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-input v-model="form.phone" placeholder="请输入员工手机" maxlength="11">
              <i slot="suffix" class="el-icon-edit" style="color: red"></i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-select v-model="form.roleIds" multiple placeholder="请选择员工角色">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.roleCn"
                :value="item.id"
                :disabled="item.roleDisabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-date-picker
              v-model="form.startWorkTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-input v-model="form.notPayAmount" placeholder="请输入未还工资(元)"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-input v-model="form.allAmount" placeholder="请输入全部工资(元)"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {blurryName, checkStaffUsername, getUserById} from "@/api/user";
import {getAllRoles} from "@/api/role";
import {Message} from "element-ui";
import {createStaff} from "@/api/staff";

export default {
  name: "StaffAddForm",
  data() {
    return {
      form: {
        id: undefined,
        username: '',
        phone: '',
        roleIds: undefined,
        startWorkTime: undefined,
        notPayAmount: undefined,
        allAmount: undefined
      },
      usernameValid: false,
      showUsernameError: false,
      usernameErrorMsg: '',
      roles: [],
      existsRoles: [],
    }
  },
  created() {
    this.getAllRoles();
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
    usernameSelected(userInfo) {
      this.checkUsernameBind();
      let id = userInfo.id;
      getUserById(id).then(data => {
        let userIntroduction = data || {};
        this.form.id = userIntroduction.id;
        this.form.phone = userIntroduction.phone;
        this.existsRoles = userIntroduction.roleResponses;
        let existsRoleIds = this.existsRoles.map(existsRole => existsRole.id);
        this.form.roleIds = existsRoleIds;
        this.roles = this.roles.map(role => {
          let roleDisabled = existsRoleIds.includes(role.id);
          return {
            'id': role.id,
            'role': role.role,
            'roleCn': role.roleCn,
            'roleDisabled': roleDisabled
          }
        });
      })
    },

    // 用户名称失去焦点事件
    usernameBlur() {
      this.checkUsernameBind();
    },

    // 校验用户名称是否已经绑定
    checkUsernameBind() {
      if (this.form.username) {
        return new Promise((resolve, reject) => {
          checkStaffUsername(this.form.username).then(data => {
            if (data) {
              this.usernameValid = true;
              this.showUsernameError = false;
            } else {
              this.usernameValid = false;
              this.showUsernameError = true;
              this.usernameErrorMsg = '该用户已经被绑定，请重新输入名称';
            }
            resolve(data)
          })
        })
      }
    },

    // 获取所有可选择权限
    getAllRoles() {
      getAllRoles().then(data => {
        this.roles = data || []
      })
    },

    // 确认按钮--创建
    confirmCreate() {
      let isSuccess = false;
      if (this.form.username === undefined || this.form.username === '') {
        Message.error('请输入姓名');
        return;
      }
      if (this.form.phone === undefined || this.form.phone === '') {
        Message.error('请输入手机号')
        return;
      }

      return new Promise((resolve, reject) => {
        this.checkUsernameBind().then(data => {
          if (data) {
            if (this.showUsernameError) {
              Message.error("请输入正确的姓名");
              return;
            }

            createStaff(this.form).then(() => {
              Message.success('创建员工' + this.form.username + '成功');
              isSuccess = true;
              resolve(isSuccess);
            })
          }
        })

      })
    }
  },
}
</script>

<style scoped>

</style>
