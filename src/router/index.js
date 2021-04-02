import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '@/store'

const routes = [
  {
    path: '/page',
    component: () => import('@/views/Page.vue')
  },
  {
    path: '/page/test',
    component: () => import('@/views/Test.vue'),
    beforeEnter(to, from, next) {
      if (store.getters['page/limit']) next('/page')
      else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
