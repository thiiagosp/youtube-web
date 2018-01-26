import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/not-found/NotFound.vue'
import Main from '../components/main/Main.vue'
import Result from '../components/result/Result.vue'


Vue.use(Router)

export default new Router({})

export const routes = [
  { path: '/', component: Main, name: 'Main' },
  { path: '/result', component: Result, name: 'Result' },
  { path: '/*', component: NotFound}
]