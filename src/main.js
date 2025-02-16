import Vue from 'vue'
import App from './App.vue'
import './assets/css/main.css';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap CSS
import 'bootstrap-vue/dist/bootstrap-vue.css'; // BootstrapVue CSS
import './registerServiceWorker'

Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
