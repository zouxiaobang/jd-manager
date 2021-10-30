<template>
  <div>
    <company-counter></company-counter>
    <company-today-table></company-today-table>
  </div>
</template>

<script>
import CompanyCounter from "@/components/company/CompanyCounter";
import CompanyTodayTable from "@/components/company/CompanyTodayTable";
export default {
  name: "Company",
  components: {CompanyTodayTable, CompanyCounter}
}
</script>

<style scoped>

</style>
