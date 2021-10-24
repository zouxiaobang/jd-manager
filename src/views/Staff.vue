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
      <el-button type="danger" @click="deleteMulti">删除</el-button>
      <el-button>批量新增</el-button>
      <el-button type="warning" @click="settleMulti">工资结算</el-button>
    </el-row>
    <el-table
      :data="staffInfos"
      stripe
      ref="staffInfoTable"
      style="width: 100%">
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
        label="工龄（天）"
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
        property="notPayAmount"
        label="未结工资"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="settle">工资结算</el-button>
          <el-button type="text">查看</el-button>
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
    <admin-dialog title="创建员工信息" :dialog-visible="dialogAddStaffVisible"
                  @onConfirmBtnClick="onConfirmBtnClick"
                  @onDialogClosed="onDialogClosed">
      <staff-add-form ref="staffAddFrom"></staff-add-form>
    </admin-dialog>

  </div>
</template>

<script>
import {deleteMultiStaff, deleteStaffById, fetchStaffInfos} from "@/api/staff";
import {Message, MessageBox} from "element-ui";
import AdminDialog from "@/components/AdminDialog";
import StaffAddForm from "@/components/staff/StaffAddForm";

export default {
  name: "Staff",
  components: {StaffAddForm, AdminDialog},
  data() {
    return {
      staffInfos: [],
      staffName: '',
      staffPhone: '',
      timeValue: [],
      workValue: 2,
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
      dialogAddStaffVisible: false,
    }
  },
  created() {
    this.fetchStaffInfos();
  },
  methods: {
    // 查询员工列表
    fetchStaffInfos() {
      let startTime = this.timeValue.length > 0 ? this.timeValue[0] : null;
      let endTime = this.timeValue.length > 1 ? this.timeValue[1] : null;
      fetchStaffInfos(this.currentPage - 1, this.pageSize, this.staffName, this.staffPhone, this.workValue, startTime, endTime).then(data => {
        let pageVo = data || {};
        this.total = Number(pageVo.total);
        this.staffInfos = pageVo.content || [];
      })
    },

    // 分页插件每页个数选择
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchStaffInfos();
    },

    // 分页插件页数选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchStaffInfos();
    },

    // 模糊匹配搜索
    search() {
      this.fetchStaffInfos();
    },

    // 单条删除
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

    // 多条删除
    deleteMulti() {
      MessageBox.confirm('确认删除用户', 'tip', {
        confirmButtonText: '确定',
        showClose: true,
        showCancelButton: true,
        closeOnClickModal: false,
        type: 'info'
      }).then(() => {
        let selections = this.$refs.staffInfoTable.selection;
        let staffIds = selections.map(selection => selection.id);
        deleteMultiStaff(staffIds).then(() => {
          Message.success('删除员工成功');
          this.fetchStaffInfos()
        })
      });
    },

    // 新增员工
    addStaff() {
      this.dialogAddStaffVisible = true;
    },

    // 单条月结
    settle() {

    },

    // 多条月结
    settleMulti() {

    },

    // 新增Dialog关闭事件监听
    onDialogClosed() {
      this.dialogAddStaffVisible = false;
    },

    // 新增Dialog完成事件监听
    onConfirmBtnClick() {
      this.$refs.staffAddFrom.confirmCreate().then(isSuccess => {
        if (isSuccess) {
          this.dialogAddStaffVisible = false;
          this.fetchStaffInfos()
        }
      })
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
