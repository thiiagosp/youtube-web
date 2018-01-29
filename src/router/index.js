import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/not-found/NotFound.vue'
import Main from '../components/main/Main.vue'

Vue.use(Router)

export default new Router({})

export const routes = [
  {path: '/', component: Main, name: 'Main'},
  {path: '/*', component: NotFound}
]
