import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "amfe-flexible";
import Axios from 'axios'
/*根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境
    Axios.defaults.baseURL = 'http://localhost:8080';

} else {
    //test 测试环境
    Axios.defaults.baseURL = 'http://localhost:8080/mock';

}
Vue.prototype.axios = Axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
