import Vue from 'vue'
import Router from 'vue-router'
import login1 from '@/components/login1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login1',
      component: login1
    }
  ]
})
