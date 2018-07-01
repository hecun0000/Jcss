import Vue from 'vue'
import Router from 'vue-router'
import canvasMouse from '@/components/canvasMouse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'canvasMouse',
      component: canvasMouse
    }
  ]
})
