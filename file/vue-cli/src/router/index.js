import Vue from 'vue'
import Router from 'vue-router'
import xlsxDemo from '@/components/xlsxDemo'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'xlsxDemo',
    component: xlsxDemo
  }]
})
