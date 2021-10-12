<template>
  <div>
    {{staffId}}
  </div>
</template>

<script>
export default {
  name: "StaffCount",
  computed: {
    staffId() {
      return this.$route.params.staffId;
    }
  }
}
</script>

<style scoped>

</style>