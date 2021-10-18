<template>
  <div id="app">

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  color: #2c3e50;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
