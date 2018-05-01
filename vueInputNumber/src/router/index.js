import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import inputNumber from '@/components/inputNumber'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inputNumber',
      component: inputNumber
    }
  ]
})
