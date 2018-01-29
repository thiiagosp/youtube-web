import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './router'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
