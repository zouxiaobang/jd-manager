import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from "@/store/store";
import './assets/css/style.less'

// 加载插件
import './main/elementUiJs';
import './router/routerP'
require('./mock')


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
