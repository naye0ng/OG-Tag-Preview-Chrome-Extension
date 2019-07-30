import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);
Vue.use(BootstrapVue);

export default new VueRouter({
  routes,
});
