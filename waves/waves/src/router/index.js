import Vue from 'vue'
import Router from 'vue-router'
import waves from '@/components/waves'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'waves',
      component: waves
    }
  ]
})
