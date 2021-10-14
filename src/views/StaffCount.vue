<template>
  <div>
    <staff-info-component></staff-info-component>

    <el-divider></el-divider>

    <div>
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

        </el-form-item>
        <el-form-item label="个数">

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import StaffInfoComponent from "@/components/StaffInfoComponent";
import {fetchProductInfos} from "@/api/product";

export default {
  name: "StaffCount",
  components: {StaffInfoComponent},
  data() {
    return {
      form: {},
      selectedProductId: undefined,
      selectedProductDesc: '',
      productInfos: []
    }
  },
  created() {
    this.fetchProductInfos();
  },
  methods: {
    fetchProductInfos() {
      fetchProductInfos().then(data => {
        this.productInfos = data || []
        if (data && data.length) {
          this.selectedProductId = data[0].id
          this.selectedProductDesc = data[0].desc
        }
      })
    },
    selectProduct(productId) {
      this.productInfos.forEach(product => {
        if (product.id === productId) {
          this.selectedProductDesc = product.desc;
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
