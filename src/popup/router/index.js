import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Bootstrap
Vue.use(BootstrapVue)
// Fontawesome
library.add(fab)
library.add(faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

// Router
Vue.use(VueRouter)
export default new VueRouter({
  routes,
});
