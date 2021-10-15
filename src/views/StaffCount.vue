<template>
  <div>
    <staff-info-component :staff-info="staffInfo" :show-empty="showEmpty"></staff-info-component>

    <el-divider></el-divider>

    <div v-if="staffInfo">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="产品编号">
              <el-select v-model="selectedProductId" filterable placeholder="请选择"
                         @change="selectProduct">
                <el-option v-for="product in productInfos"
                           :key="product.id"
                           :label="product.name"
                           :value="product.id">
                </el-option>
              </el-select>
              <el-tag v-if="selectedProductDesc" style="margin-left: 4px" size="small" type="info">
                {{ selectedProductDesc }}
              </el-tag>
            </el-form-item>
            <el-form-item label="完成时长">
              <el-input-number v-model="productFinishTime" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="完成个数">
              <el-input clearable v-model="productNum" placeholder="请输入个数"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="10" :offset="2" v-if="productNum">
          <div>
            <el-card>
              <p>
                <span class="tip">{{ productFinishTime }}</span>
                天已完成
                <span class="tip-product-num">{{ productNum }}</span>
                件
                <span class="tip">{{ selectedProduct.name }}</span>
              </p>

              <p style="margin-top: 50px;text-align: right;">
                <span class="tip-confirm">请点击确认按钮</span>
                <el-button type="primary" @click.native="confirm">确认</el-button>
              </p>
            </el-card>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import StaffInfoComponent from "@/components/StaffInfoComponent";
import {fetchProductInfos} from "@/api/product";
import {fetchStaffInfo, addProductCountOfStaff} from "@/api/staff";
import {Message} from "element-ui";

export default {
  name: "StaffCount",
  components: {StaffInfoComponent},
  computed: {
    staffId() {
      return this.$route.params.staffId;
    }
  },
  data() {
    return {
      staffInfo: undefined,
      showEmpty: false,
      form: {},
      selectedProduct: {},
      selectedProductId: undefined,
      selectedProductDesc: '',
      productInfos: [],
      productFinishTime: 1,
      productNum: undefined
    }
  },
  created() {
    this.fetchProductInfos();
    this.fetchStaffInfo()
  },
  methods: {
    fetchProductInfos() {
      fetchProductInfos().then(data => {
        this.productInfos = data || []
        if (data && data.length) {
          this.selectedProduct = data[0]
          this.selectedProductId = data[0].id
          this.selectedProductDesc = data[0].desc
        }
      })
    },
    selectProduct(productId) {
      this.productInfos.forEach(product => {
        if (product.id === productId) {
          this.selectedProduct = product;
          this.selectedProductDesc = product.desc;
        }
      })
    },
    fetchStaffInfo() {
      fetchStaffInfo(this.staffId).then(data => {
        this.showEmpty = data === null
        this.staffInfo = data || {}
      })
    },
    confirm() {
      addProductCountOfStaff(this.staffInfo.id, this.selectedProductId, this.productFinishTime, this.productNum)
          .then(() => {
            Message.success("提交成功");
            this.$router.go(-1)
          })
    }
  }
}
</script>

<style scoped lang="less">
.tip {
  color: #409EFF;
}

.tip-product-num {
  color: #409EFF;
  font-size: 60px;
  font-weight: bold;
}

.tip-confirm {
  color: #707070;
  font-size: 10px;
  margin-right: 4px;
}
</style>
