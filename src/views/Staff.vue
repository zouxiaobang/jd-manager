<template>
  <div>
    <el-row style="margin-bottom: 8px">
      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="search-input">
        <el-input v-model="staffName" placeholder="请输入姓名"></el-input>
      </el-col>

      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="search-input">
        <el-input v-model="staffPhone" placeholder="请输入手机号"></el-input>
      </el-col>

      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="search-input">
        <el-select v-model="workValue" placeholder="请选择">
          <el-option
            label="全部"
            :value="2">
          </el-option>
          <el-option
            label="在职"
            :value="1">
          </el-option>
          <el-option
            label="离职"
            :value="0">
          </el-option>
        </el-select>
      </el-col>

      <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6" class="search-input">
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-col>

      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="search-input">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-button type="primary" @click="addStaff">新增</el-button>
      <el-button type="danger">删除</el-button>
      <el-button>批量新增</el-button>
    </el-row>
    <el-table
      :data="staffInfos"
      stripe
      style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="false"
        property="id"
        width="50">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="phone"
        label="手机"
        width="180">
      </el-table-column>
      <el-table-column
        property="workTime"
        label="工龄"
        width="120">
      </el-table-column>
      <el-table-column
        property="onboardingTime"
        label="入职时间"
        width="220">
      </el-table-column>
      <el-table-column
        property="statusDesc"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text" @click="deleteSingle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="staffInfos && staffInfos.length !== 0 && total > pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="创建员工信息" :visible.sync="dialogFormVisible">
      <el-form :model="addStaffForm">
        <el-form-item label="员工名称" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="addStaffForm.name"
            :fetch-suggestions="userNameChanged"
            :trigger-on-focus="false"
            placeholder="请输入内容"
            @blur="staffUsernameCheckBlur"
            @select="checkUserName"></el-autocomplete>
          <el-button v-if="usernameValid" type="success" icon="el-icon-check" circle size="mini"></el-button>
          <el-popover
            v-if="showUsernameError"
            placement="top-start"
            width="200"
            trigger="hover"
            :content="usernameErrorMsg">
            <el-button slot="reference" type="danger" icon="el-icon-close" circle size="mini"></el-button>
          </el-popover>
        </el-form-item>

        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="addStaffForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deleteStaffById, fetchStaffInfos} from "@/api/staff";
import {Message, MessageBox} from "element-ui";
import {blurryName, checkStaffUsername} from "@/api/user";

export default {
  name: "Staff",
  data() {
    return {
      staffInfos: [],
      staffName: '',
      staffPhone: '',
      timeValue: [],
      workValue: 2,
      multipleSelection: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      addStaffForm: {},
      userInfos: [],
      usernameValid: false,
      showUsernameError: false,
      usernameErrorMsg: '该员工已存在',
    }
  },
  created() {
    this.fetchStaffInfos();
  },
  methods: {
    fetchStaffInfos() {
      let startTime = this.timeValue.length > 0 ? this.timeValue[0] : null;
      let endTime = this.timeValue.length > 1 ? this.timeValue[1] : null;
      fetchStaffInfos(this.currentPage - 1, this.pageSize, this.staffName, this.staffPhone, this.workValue, startTime, endTime).then(data => {
        let pageVo = data || {};
        this.total = Number(pageVo.total);
        this.staffInfos = pageVo.content || [];
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchStaffInfos();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchStaffInfos();
    },

    search() {
      this.fetchStaffInfos();
    },

    addStaff() {
      this.dialogFormVisible = true;
    },

    deleteSingle(row) {
      MessageBox.confirm('确认删除用户' + row.name, 'tip', {
        confirmButtonText: '确定',
        showClose: true,
        showCancelButton: true,
        closeOnClickModal: false,
        type: 'info'
      }).then(() => {
        deleteStaffById(row.id).then(() => {
          Message.success('删除员工成功');
          this.fetchStaffInfos()
        })
      })
    },

    userNameChanged(query, cb) {
      if (query && query !== '') {
        blurryName(query).then(data => {
          this.userInfos = data || [];
          let transferData = this.userInfos.map(function (userInfo){
            return {'value': userInfo.username, 'id': userInfo.id};
          });
          cb(transferData)
          if (this.userInfos.length > 0) {

          }
          this.checkUserName();
        });
      }
    },

    checkUserName() {
      if (this.addStaffForm.name) {
        checkStaffUsername(this.addStaffForm.name).then(data => {
          if (data) {
            this.usernameValid = true;
            this.showUsernameError = false;
          } else {
            this.usernameValid = false;
            this.showUsernameError = true;
          }
        })
      } else {
        this.usernameValid = false;
        this.showUsernameError = true;
        this.usernameErrorMsg = '请输入员工名称'
      }
    },
    staffUsernameCheckBlur() {
      if (!this.addStaffForm.name) {
        this.usernameValid = false;
        this.showUsernameError = true;
        this.usernameErrorMsg = '请输入员工名称'
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-input {
  padding-left: 4px;
  padding-right: 4px;
  margin-bottom: 8px;
}

.status-off-work {
  color: #DCDFE6
}

.status-on-work {
  color: #777
}
</style>
