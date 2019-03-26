import Vue from 'vue';
//引入全局初始化样式
import "@/assets/css/resets.css";
//引入页面全局公共样式
import "@/assets/css/style.css";
import "@/assets/css/common.css";
//引入iview
import "@/libs/iview";
// 引入组件
import App from './App';
//引入路由
import router from "@/libs/router"

Vue.config.productionTip = false;

/* eslint-disable no-new */


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
