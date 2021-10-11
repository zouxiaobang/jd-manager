import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";

// 加载插件
import './main/elementUiJs';
import './router/routerP'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
