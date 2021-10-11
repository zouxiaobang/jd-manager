import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from "@/store/store";

// 加载插件
import './main/elementUiJs';
import './router/routerP'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
