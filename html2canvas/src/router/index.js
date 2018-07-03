import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import html2canvas from '@/components/html2canvas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'html2canvas',
      component: html2canvas
    }
  ]
})
