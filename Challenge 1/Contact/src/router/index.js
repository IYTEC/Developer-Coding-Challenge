import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import View from '@/components/View'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/view/:id',
      name: 'view',
      component: View
    },

    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    }
  ]
})
