// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })


import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './router'
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
