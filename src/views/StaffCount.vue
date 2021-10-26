<template>
  <div>
    <staff-info-component :staff-info="staffInfo" :show-empty="showEmpty"></staff-info-component>

    <el-divider></el-divider>

    <div v-if="staffInfo && !showEmpty">
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
            <el-form-item label="产品批次">
              <el-select v-model="selectedProductBatchId" filterable placeholder="请选择"
                         @change="selectProductBatch">
                <el-option v-for="productBatch in productBatchs"
                           :key="productBatch.id"
                           :label="productBatch.batchName"
                           :value="productBatch.id">
                </el-option>
              </el-select>
              <el-tag style="margin-left: 4px" size="small" type="info" v-model="price">
                单价 {{ price }}
              </el-tag>
            </el-form-item>
            <el-form-item label="已用天数">
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
                （批次：
                <span class="tip">{{ selectedProductBatch.batchName }}</span>）
              </p>
              <p style="margin-top: 8px">
                金额
                <span class="tip-product-num">{{ parseFloat(productNum * price).toFixed(2) }}</span>
                元
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
import StaffInfoComponent from "@/components/staff/StaffInfoComponent";
import {checkBatchStatus, fetchProductBatch, fetchProductInfos} from "@/api/product";
import {fetchStaffInfo, addProductCountOfStaff} from "@/api/staff";
import {Message, MessageBox} from "element-ui";

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
      showEmpty: true,
      form: {},
      selectedProduct: {},
      selectedProductId: undefined,
      selectedProductDesc: '',
      productInfos: [],
      productFinishTime: 1,
      productNum: undefined,
      productBatchs: [],
      selectedProductBatchId: undefined,
      selectedProductBatch: {},
      price: undefined
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
        if (this.productInfos.length) {
          this.selectedProduct = this.productInfos[0]
          this.selectedProductId = this.productInfos[0].id
          this.selectedProductDesc = this.productInfos[0].desc
        }
        this.fetchProductBatch()
      })
    },
    fetchProductBatch() {
      fetchProductBatch(this.selectedProductId).then(data => {
        this.productBatchs = data || []
        if (this.productBatchs.length) {
          this.selectedProductBatch = this.productBatchs[0];
          this.selectedProductBatchId = this.productBatchs[0].id;
          this.price = this.productBatchs[0].price;
        } else {
          this.selectedProductBatch = {};
          this.selectedProductBatchId = undefined;
          this.price = undefined;
        }
      })
    },
    selectProduct(productId) {
      this.productInfos.forEach(product => {
        if (product.id === productId) {
          this.selectedProduct = product;
          this.selectedProductDesc = product.desc;
          this.fetchProductBatch()
        }
      })
    },
    fetchStaffInfo() {
      fetchStaffInfo(this.staffId).then(data => {
        this.showEmpty = data === null
        this.staffInfo = data || {}
      })
    },
    selectProductBatch(batchId) {
      this.productBatchs.forEach(batch => {
        if (batch.id === batchId) {
          this.selectedProductBatch = batch;
          this.price = batch.price;
        }
      })
    },
    confirm() {
      if (this.selectedProductBatchId) {
        checkBatchStatus(this.selectedProductBatchId, this.productNum).then(data => {
          if (data.finishStatus) {
            MessageBox.confirm(data.message, 'tip', {
              confirmButtonText: '确定',
              showClose: true,
              showCancelButton: true,
              closeOnClickModal: false,
              type: 'warning'
            }).then(() => {
              this.recordProductCount()
            })
          } else {
            this.recordProductCount()
          }
        })
      } else {
        this.recordProductCount()
      }
    },
    recordProductCount() {
      let amount = null;
      if (this.price) {
        amount = parseFloat(this.productNum * this.price).toFixed(2);
      }
      addProductCountOfStaff(this.staffInfo.id, this.selectedProductId, this.productFinishTime, this.productNum, this.selectedProductBatchId, amount)
        .then(() => {
          Message.success("提交成功");
          this.$router.back()
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
